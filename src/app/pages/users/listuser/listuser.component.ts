import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import { OthersService } from 'src/app/services/others.service';
import { ModalService } from 'src/app/modal/_modal/modal.service';
import { environment } from 'src/environments/environment';
import { ErrormodalService } from 'src/app/modal/_errormodals';

@Component({
  selector: 'app-listuser',
  templateUrl: './listuser.component.html',
  styleUrls: ['./listuser.component.scss']
})
export class ListuserComponent implements OnInit {
  public data; any;
  public datas: any;
  date: any;
  role;
  dataUser: any;
  attestationForm: FormGroup;
  page = 1;
  itemsPerPage = 12;
  totalItems : any;
  filterterm
  public reqUrl = environment.base_url;
  result;
  success;
  successMsg;
  errorMsg: any;
  constructor(private dataService: DataService,
    public datepipe: DatePipe,
    private errormodalService: ErrormodalService,
    public router: Router,
    private modalService: ModalService,
    private otherService: OthersService,
    private http: HttpClient
    ) { }

  ngOnInit() {
    this.role = localStorage.getItem('user');
    
    this.gty(this.page);
  }

  
  gty(page: any){
    this.http.get(this.reqUrl + `/users/all?page=${page}&limit=${this.itemsPerPage}`).subscribe((data: any) => {
      this.dataUser =  data.data;
      this.totalItems = data.total;
    })
  }


  openDetail(data) {
    this.router.navigate(['/accueil/detailuser'], {
      queryParams: {
        user: JSON.stringify(data)
      }
    })
  }

  downloadFile(data: any) {
    const replacer = (key, value) => (value === null ? '' : value); 
    const header = Object.keys(data[0]);
    const csv = data.map((row) =>
      header
        .map((fieldName) => JSON.stringify(row[fieldName], replacer))
        .join(',')
    );
    csv.unshift(header.join(','));
    const csvArray = csv.join('\r\n');
  
    const a = document.createElement('a');
    const blob = new Blob([csvArray], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
  
    a.href = url;
    a.download = 'myFile.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  openErrorModal(id: string) {
    this.errormodalService.open(id);
  }

  closeErrorModal(id: string) {
    this.errormodalService.close(id);
  }

}
