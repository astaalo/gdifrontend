import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { NgxFileSaverService } from '@clemox/ngx-file-saver';
import { DataService } from 'src/app/service/data.service';
import { OthersService } from 'src/app/services/others.service';
import { ModalService } from 'src/app/modal/_modal';
import { environment } from 'src/environments/environment';
import { ErrormodalService } from 'src/app/modal/_errormodals';

@Component({
  selector: 'app-lesdemandes',
  templateUrl: './lesdemandes.component.html',
  styleUrls: ['./lesdemandes.component.scss']
})
export class LesdemandesComponent implements OnInit {

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
  filterForm: FormGroup;
  validerForm : FormGroup;
  result;
  errorMsg: any;
  scrHeight:any;
  scrWidth:any;
  type = null;
  listeFonction: any;
  listeDemande: any;
  dataSociete: any;
  dataDirection: any;
  dataAgence: any;
  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
        this.scrHeight = window.innerHeight;
        this.scrWidth = window.innerWidth;
  }
  public reqUrl = environment.base_url;
  constructor(private fb: FormBuilder,
    private modalService: ModalService,
    private errormodalService: ErrormodalService,
    private otherService: OthersService,
    private http: HttpClient,
    public datepipe: DatePipe) {
      this.form = this.fb.group({
        checkArray: this.fb.array([])
      });
      this.getScreenSize();
    }

  ngOnInit() {
    this.validerForm = new FormGroup({
      status: new FormControl('')
    })
    
    this.filterForm = new FormGroup({
      type: new FormControl(''),
      direction: new FormControl(''),
      agence: new FormControl(''),
      societe: new FormControl(''),
    });
    this.otherService.getAllSociete().subscribe(
      data => {
        this.dataSociete = data["data"];
      }
    );
    this.otherService.getTypeDemande().subscribe((data: any) => {
      this.listeDemande =  data.data;
    })
    this.http.get(this.reqUrl + `/listeAgence?page=1&limit=900`).subscribe((data: any) => {
      this.dataAgence =  data.data;
    })
    this.gty(this.page);
  }

  directionsListe(value) {
    this.otherService.getAllDirection(value).subscribe(
      data => {
        this.dataDirection = data['data'];
       }
    ); 
  }

  public saveProfession(e): void {
    let libelle = e.target.value;
    let list = this.listeDemande.filter(x => x.libelle === libelle)[0];
  //  this.filterForm.patchValue({type: list});
  }
  
  gty(page: any){
    if (this.filterForm.value.type == undefined) {
      this.filterForm.patchValue({type: ''});
    }
    if(this.filterForm.value.type) {
      this.type = this.filterForm.value.type;
    }
    this.otherService.getListedesDemande(page, this.itemsPerPage, this.type).subscribe((data: any) => {
      this.dd =  data.data;
      this.totalItems = data.total;
    })
  }
  

  selectAll() {
    for (var i = 0; i < this.dd.length; i++) {
      this.dd[i].etat = this.selectedAll;
    }
    this.getCheckedItemList();
  }
  checkIfAllSelected() {
    this.selectedAll = this.dd.every(function(item:any) {
      return item.etat == 0;
    })
    this.getCheckedItemList();
  }
  getCheckedItemList() {
    this.checkedList = [];
    for (var i = 0; i < this.dd.length; i++) {
      if(this.dd[i].etat) {
        this.checkedList.push(this.dd[i]);
        this.http.post(`${this.reqUrl}/validerDemande/${this.dd[i].id}`, null).subscribe(
          data => {
            this.result = data;
          }
        )
      }
    }
    this.checkedList = this.checkedList;
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

  getcolor1(p) {
    let color = "#8c8c8c"
    let d = new Date();
    var g1 = new Date(d.getFullYear(), d.getMonth()+1, d.getDate());
    let date = new Date(p.dateFin);
    let now = this.datepipe.transform(g1, 'yyyyMMdd');
    let dates = this.datepipe.transform(date, 'yyyyMMdd');
    if(now > dates) {
      color = "#8c8c8c"
    } else {
      color = "#009393"
    }  
    return color; 
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
