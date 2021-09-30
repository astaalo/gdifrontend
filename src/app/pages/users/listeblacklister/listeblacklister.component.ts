import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { DataService } from 'src/app/service/data.service';
import { ModalService } from 'src/app/modal/_modal';
import { OthersService } from 'src/app/services/others.service';
import { DatePipe } from '@angular/common';
import { ErrormodalService } from 'src/app/modal/_errormodals';
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
  filterForm: FormGroup;
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
  scrHeight:any;
  scrWidth:any;
  validerForm : FormGroup;
  result;
  errorMsg: any;
  role;
  ListePiece = [
    {
      id: 1, 
      libelle: "cni",
    },
    {
      id: 2, 
      libelle: "passport"
    }
  ];
  public telephone = null;
  public typePiece = null;
  public numeroPiece = null;
  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
        this.scrHeight = window.innerHeight;
        this.scrWidth = window.innerWidth;
  }
  public reqUrl = environment.base_url;
  constructor(private fb: FormBuilder,
    private modalService: ModalService,
    private errormodalService: ErrormodalService,
    private fileSaver: NgxFileSaverService,
    private otherService: OthersService,
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
    
    this.filterForm = new FormGroup({
      telephone: new FormControl(''),
      typePiece: new FormControl(''),
      numeroPiece: new FormControl(''),
    });

    this.gty(this.page);
  }
  gty(page: any){
      this.telephone = this.filterForm.value.telephone;
      this.typePiece = this.filterForm.value.typePiece;
      this.numeroPiece = this.filterForm.value.numeroPiece;
    this.otherService.getListeNoire(page, this.itemsPerPage, this.telephone, this.typePiece, this.numeroPiece).subscribe((data: any) => {
      this.dd =  data.data;
      this.totalItems = data.total;
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

  openErrorModal(id: string) {
    this.errormodalService.open(id);
  }

  closeErrorModal(id: string) {
    this.errormodalService.close(id);
  }

}
