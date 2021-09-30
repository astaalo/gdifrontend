import { Component, OnInit, HostListener } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DataService } from 'src/app/service/data.service';
import { ModalService } from 'src/app/modal/_modal';
import { NgxFileSaverService } from '@clemox/ngx-file-saver';
import { OthersService } from 'src/app/services/others.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ErrormodalService } from 'src/app/modal/_errormodals';

@Component({
  selector: 'app-mon-manager',
  templateUrl: './mon-manager.component.html',
  styleUrls: ['./mon-manager.component.scss']
})
export class MonManagerComponent implements OnInit {

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
  itemsPerPage = 10;
  totalItems : any;
  public reqUrl = environment.base_url;
  constructor(private modalService: ModalService,
    private fileSaver: NgxFileSaverService,
    private otherService: OthersService,
    private errormodalService: ErrormodalService,
    private http: HttpClient,) {
      this.getScreenSize();
    }

  ngOnInit() {
    this.user = localStorage.getItem('user');
    this.item = JSON.parse(localStorage.getItem('currentUser'));
    this.otherService.getDetailsManagerById(this.item.manager.id).subscribe( 
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
    this.http.get(this.reqUrl + `/manager/${this.item.manager.id}?page=${page}&limit=${this.itemsPerPage}`).subscribe((data: any) => {
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
