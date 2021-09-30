import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OthersService } from 'src/app/services/others.service';
import { environment } from 'src/environments/environment';
import { DataService } from 'src/app/service/data.service';
import { ModalService } from 'src/app/modal/_modal';
import { NgxFileSaverService } from '@clemox/ngx-file-saver';
import { HttpClient } from '@angular/common/http';
import { ErrormodalService } from 'src/app/modal/_errormodals';

@Component({
  selector: 'app-detailmanager',
  templateUrl: './detailmanager.component.html',
  styleUrls: ['./detailmanager.component.scss']
})
export class DetailmanagerComponent implements OnInit {
  scrHeight:any;
  scrWidth:any;
  viewer = 'google';   
  filterterm: string;
  datas: any;
  showHome = true;
  user;
  item;
  avatar;
  data;
  dataInterFin;
  managerinfo;
  errorMsg: any;
  DemoDoc1;
  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
        this.scrHeight = window.innerHeight;
        this.scrWidth = window.innerWidth;
        console.log(this.scrHeight, this.scrWidth);
  }
  page = 1;
  itemsPerPage = 10;
  totalItems : any;
  public reqUrl = environment.base_url;
  constructor(private modalService: ModalService,
    private errormodalService: ErrormodalService,
    private fileSaver: NgxFileSaverService,
    private otherService: OthersService,
    private http: HttpClient,
    private activeroute: ActivatedRoute) {
      this.getScreenSize();

      this.activeroute.queryParams.subscribe(params => {
        this.item = JSON.parse(params["user"]);
      })
    }

  ngOnInit() {
    this.user = localStorage.getItem('user');
    this.otherService.getDetailsManagerById(this.item).subscribe( 
      result => {
        this.data = result;
        this.managerinfo = this.data.data.detail
        this.datas = this.data.data.interimaires
      }
    )
    if(this.user == 'inter') {
      this.showHome = false;
    } else {
      this.showHome = true;
    }

     this.otherService.getInter().subscribe(
      data => {
       this.dataInterFin = data.data;
      }
    ); 
    this.gty(this.page);
  }

  gty(page: any){
    this.http.get(this.reqUrl + `/manager/${this.item}?page=${page}&limit=${this.itemsPerPage}`).subscribe((data: any) => {
      this.datas =  data.data;
      this.totalItems = this.datas.total
    })
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
