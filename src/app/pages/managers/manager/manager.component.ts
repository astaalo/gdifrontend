import { HttpClient } from '@angular/common/http';
import { DataService } from '../../../service/data.service';
import { Component, HostListener, OnInit } from '@angular/core';
import { NgxFileSaverService } from '@clemox/ngx-file-saver';
import { ModalService } from 'src/app/modal/_modal/modal.service';
import { ActivatedRoute } from '@angular/router';
import {OthersService} from '../../../services/others.service';
import { environment } from 'src/environments/environment';
import { ErrormodalService } from 'src/app/modal/_errormodals';


@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss']
})
export class ManagerComponent implements OnInit {
  scrHeight:any;
  scrWidth:any;
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
  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
        this.scrHeight = window.innerHeight;
        this.scrWidth = window.innerWidth;
  }
  page = 1;
  itemsPerPage = 5;
  totalItems : any;
  public reqUrl = environment.base_url;
  constructor(private modalService: ModalService,
    private errormodalService: ErrormodalService,
    private fileSaver: NgxFileSaverService,
    private otherService: OthersService,
    private http: HttpClient,) {
      this.getScreenSize();
    }

  ngOnInit() {
    this.user = localStorage.getItem('user');
    this.item = JSON.parse(localStorage.getItem('currentUser'));
    this.otherService.getDetailsManagerById(this.item.data.id).subscribe( 
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
    this.http.get(this.reqUrl + `/manager/${this.item.data.id}?page=${page}&limit=${this.itemsPerPage}`).subscribe((data: any) => {
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
  public getfilemodal() {
    this.fileSaver.saveUrl(this.item, 'contrat');
  }

  openErrorModal(id: string) {
    this.errormodalService.open(id);
  }

  closeErrorModal(id: string) {
    this.errormodalService.close(id);
  }
}
