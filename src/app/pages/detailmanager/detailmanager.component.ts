import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OthersService } from 'src/app/services/others.service';
import { environment } from 'src/environments/environment';
import { DataService } from 'src/app/service/data.service';
import { ModalService } from 'src/app/_modal';
import { NgxFileSaverService } from '@clemox/ngx-file-saver';
import { HttpClient } from '@angular/common/http';
import { ErrormodalService } from 'src/app/_errormodals';

@Component({
  selector: 'app-detailmanager',
  templateUrl: './detailmanager.component.html',
  styleUrls: ['./detailmanager.component.scss']
})
export class DetailmanagerComponent implements OnInit {
  scrHeight:any;
  scrWidth:any;
  viewer = 'google';   
  DemoDoc="http://www.africau.edu/images/default/sample.pdf" 
  DemoDoc1="https://file-examples.com/wp-content/uploads/2017/02/file-sample_100kB.doc"
  DemoDoc2="https://www.le.ac.uk/oerresources/bdra/html/resources/example.txt" 
  filterterm: string;
  datas: any;
  showHome = true;
  user;
  item;
  avatar;
  data;
  dataInterFin;
  managerinfo;
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
  constructor(private dataService: DataService,
    private modalService: ModalService,
    private errormodalService: ErrormodalService,
    private fileSaver: NgxFileSaverService,
    private otherService: OthersService,
    private http: HttpClient,
    private activeroute: ActivatedRoute) {
      this.getScreenSize();

      this.activeroute.queryParams.subscribe(params => {
        this.item = JSON.parse(params["user"]);
        console.log(this.item);
      })
    }

  ngOnInit() {
    this.user = localStorage.getItem('user');
    this.otherService.getDetailsManagerById(this.item).subscribe( 
      result => {
        this.data = result;
        this.managerinfo = this.data.data.detail
        this.datas = this.data.data.interimaires
        console.log(result);
        
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
       console.log(data);
      }
    ); 
    this.gty(this.page);
  }

  gty(page: any){
    this.http.get(this.reqUrl + `/manager/${this.item}?page=${page}&limit=${this.itemsPerPage}`).subscribe((data: any) => {
      this.datas =  data.data;
      this.totalItems = this.datas.total
      console.log(this.datas);
      console.log(this.totalItems);
      
    })
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }
  public getfilemodal() {
    this.fileSaver.saveUrl(this.DemoDoc, 'contrat');
  }
  openErrorModal(id: string) {
    this.errormodalService.open(id);
  }

  closeErrorModal(id: string) {
    this.errormodalService.close(id);
  }
}
