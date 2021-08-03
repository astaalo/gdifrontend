import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { DataService } from 'src/app/service/data.service';
import { ModalService } from 'src/app/_modal';
import { OthersService } from 'src/app/services/others.service';
import { DatePipe } from '@angular/common';
import { ErrormodalService } from 'src/app/_errormodals';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgxFileSaverService } from '@clemox/ngx-file-saver';

@Component({
  selector: 'app-listeblacklister',
  templateUrl: './listeblacklister.component.html',
  styleUrls: ['./listeblacklister.component.scss']
})
export class ListeblacklisterComponent implements OnInit {

  
  checkedList:any;
  selectedAll: any;
  public restant: any;
  public nombre = 69;
  public left: any;
  public datas: any;
  dd :any;
  pager: any = {};
  filterterm: string;
  public p: any;
  dataDemande;
  pagedItems: any[];
  page = 1;
  itemsPerPage = 10;
  totalItems : any;
  date: any;
  tempArr: any = { "brands": [] };
  form: FormGroup;
  parentCk=false;
  ck=false;
  viewer = 'google';  
  selectedType = 'docx';   
  DemoDoc="http://www.africau.edu/images/default/sample.pdf" 
  DemoDoc1="https://file-examples.com/wp-content/uploads/2017/02/file-sample_100kB.doc"
  DemoDoc2="https://www.le.ac.uk/oerresources/bdra/html/resources/example.txt" 
  scrHeight:any;
  scrWidth:any;
  validerForm : FormGroup;
  result;
  errorMsg: any;
  role;
  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
        this.scrHeight = window.innerHeight;
        this.scrWidth = window.innerWidth;
        console.log(this.scrHeight, this.scrWidth);
  }
  public reqUrl = environment.base_url;
  constructor(private dataService: DataService,
    private fb: FormBuilder,
    private modalService: ModalService,
    private errormodalService: ErrormodalService,
    private fileSaver: NgxFileSaverService,
    private otherService: OthersService,
    private http: HttpClient,
    public datepipe: DatePipe) {
      this.form = this.fb.group({
        checkArray: this.fb.array([])
      });
      this.getScreenSize();
    }

  ngOnInit() {
    this.role = localStorage.getItem('user');
    this.validerForm = new FormGroup({
      status: new FormControl('')
    })
    this.gty(this.page);
  }
  gty(page: any){
    this.http.get(this.reqUrl + `/blacklist?page=${page}&limit=${this.itemsPerPage}`).subscribe((data: any) => {
      this.dd =  data.data;
      this.totalItems = data.total;
      console.log(data);
      console.log(this.totalItems);
    }, error=> {
      this.errorMsg = error;
      this.errormodalService.open('error-modal-1');
      console.log(error)
    })
  }
  
  

  getwidth() {
    this.restant = this.nombre + "%";
    return this.restant;
  }
  getposition() {
    let left1 = this.nombre - 1;
    this.left = left1 + "%";
    return this.left;
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
