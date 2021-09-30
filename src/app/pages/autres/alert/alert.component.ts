import { OthersService } from 'src/app/services/others.service';
import { DataService } from '../../../service/data.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ErrormodalService } from 'src/app/modal/_errormodals';


@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  
  datas: any;
  showHome = true;
  user;
  alert;
  page = 1;
  itemsPerPage = 10;
  totalItems : any;
  public reqUrl = environment.base_url;
  errorMsg: any;
  constructor(public router: Router,
    private errormodalService: ErrormodalService,
    private http: HttpClient) { }

  ngOnInit() {
    this.user = localStorage.getItem('user');
    if(this.user == 'inter') {
      this.showHome = false;
    } else {
      this.showHome = true;
    }
    this.gty(this.page)
  }
  gty(page: any){
    this.http.get(this.reqUrl + `/notification/all?page=${page}&limit=${this.itemsPerPage}`).subscribe((data: any) => {
      this.alert =  data.data;
      this.totalItems = data.total;
    })
  }
  openDetail(data) {
    this.router.navigate(['/accueil/detailinter'], {
      queryParams: {
        user: JSON.stringify(data)
      }
    })
  }
  openErrorModal(id: string) {
    this.errormodalService.open(id);
  }

  closeErrorModal(id: string) {
    this.errormodalService.close(id);
  }
}
