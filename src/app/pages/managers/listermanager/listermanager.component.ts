import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import { PaginationService } from 'src/app/service/pagination.service';
import { ModalService } from 'src/app/modal/_modal';
import {OthersService} from '../../../services/others.service';
import { environment } from 'src/environments/environment';
import { ErrormodalService } from 'src/app/modal/_errormodals';

@Component({
  selector: 'app-listermanager',
  templateUrl: './listermanager.component.html',
  styleUrls: ['./listermanager.component.scss']
})
export class ListermanagerComponent implements OnInit {

  public datas: any;
  page = 1;
  passenger: any; 
  itemsPerPage = 7;
  totalItems : any;
  date: any;
  scrHeight:any;
  scrWidth:any;
  filterterm;
  errorMsg: any;
  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
        this.scrHeight = window.innerHeight;
        this.scrWidth = window.innerWidth;
  }
  public reqUrl = environment.base_url;
  constructor(public datepipe: DatePipe,
    private errormodalService: ErrormodalService,
    public router: Router,
    private http: HttpClient
    ) { 
      this.getScreenSize();
    }

  ngOnInit() {
    this.gty(this.page);
  }


gty(page: any){
  this.http.get(this.reqUrl + `/managers/list?page=${page}&limit=${this.itemsPerPage}`).subscribe((data: any) => {
    this.datas =  data.data;
    this.totalItems = data.total;
  })
}

  openDetail(data) {
    this.router.navigate(['/accueil/detailmanager'], {
      queryParams: {
        user: JSON.stringify(data.id)
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
