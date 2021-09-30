import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { NgxFileSaverService } from '@clemox/ngx-file-saver';
import { ModalService } from 'src/app/modal/_modal';
import { DataService } from 'src/app/service/data.service';
import { OthersService } from 'src/app/services/others.service';
import { ErrormodalService } from 'src/app/modal/_errormodals';

@Component({
  selector: 'app-mon-agence',
  templateUrl: './mon-agence.component.html',
  styleUrls: ['./mon-agence.component.scss']
})
export class MonAgenceComponent implements OnInit {

  
  item;
  showHome = true;
  url1;
  url3;
  url2;
  urlUser;
  user;
  filename1 = "";
  filename2 = "";
  filename3 = "";
  filenameUser = "";
  showupdate;
  showadduser;
  datas: any;
  agenceForm: FormGroup;
  userAgenceForm: FormGroup;
  dataAgence;
  nom;
  id;
  responsable;
  numerodg;
  fixe;
  agence;
  email;
  telephone;
  contratDoc;
  site;
  adresse;
  logo;
  contrat;
  dataContrat;
  data;
  userAgence;
  dataTotalAgence;
  total;
  actifs;
  cnidg;
  inactifs;
  viewer = 'google';
  DemoDoc1="https://file-examples.com/wp-content/uploads/2017/02/file-sample_100kB.doc"
  DemoDoc2="https://www.le.ac.uk/oerresources/bdra/html/resources/example.txt" 
  errorMsg: any;

  constructor(private fileSaver: NgxFileSaverService,
    private modalService: ModalService,
    private errormodalService: ErrormodalService,
    private otherService: OthersService) { }

  ngOnInit() {
    this.agenceForm = new FormGroup({
      nom: new FormControl (''),
      responsable: new FormControl(''),
      numerodg: new FormControl (''),
      email: new FormControl(''),
      telephone: new FormControl (''),
      fixe: new FormControl(''),
      site: new FormControl (''),
      adresse: new FormControl(''),
      photo: new FormControl (''),
      contrat: new FormControl(''),
      cnidg: new FormControl (''),
    });
    this.userAgenceForm = new FormGroup({
      prenom: new FormControl (''),
      nom: new FormControl(''),
      poste: new FormControl (''),
      email: new FormControl(''),
      mobile: new FormControl (''),
      adresse: new FormControl(''),
      photo: new FormControl (''),
    });
    this.item = JSON.parse(localStorage.getItem('currentUser'));
    this.user = localStorage.getItem('user');
    if(this.user == 'agence') {
      this.showupdate = true;
    } else {
      this.showupdate = false;
    }
    if(this.user == 'inter') {
      this.showHome = false;
    } else {
      this.showHome = true;
    }
    this.otherService.getOneAgenceById(this.item.agence.id).subscribe(
      data =>{
        this.dataAgence = data;
        this.nom = this.dataAgence.data.nom;
        this.responsable  = this.dataAgence.data.responsable;
        this.email = this.dataAgence.data.email;
        this.telephone = this.dataAgence.data.telephone;
        this.contratDoc = this.dataAgence.data.contrat;
        this.site = this.dataAgence.data.site;
        this.adresse = this.dataAgence.data.adresse;
        this.logo = this.dataAgence.data.logo;
        this.contrat = this.dataAgence.data.contrat;
      //  this.cnidg = this.dataAgence.data.data.cnidg;
        this.numerodg = this.dataAgence.data.numdg;
        this.userAgence = this.dataAgence.data['user'];
        
      }
    );
    this.otherService.getTotalAgenceActifInactif(this.item.agence.id).subscribe(
      data =>{
        this.dataAgence = data;
        this.dataTotalAgence = data;
        this.total = this.dataTotalAgence.total;
        this.actifs = this.dataTotalAgence.actifs;
        this.inactifs = this.dataTotalAgence.inactifs;
      });

      //detail d'un contrat
    this.otherService.getContratById(this.id).subscribe(
      data =>{
        this.data = data;
        this.dataContrat = this.data.data;
      }
    )
    
  }

  submitted1() {
    const info = {
        nom: this.agenceForm.value.nom,
        nomdg: this.agenceForm.value.nomdg,
        numerodg: this.agenceForm.value.numerodg,
        email: this.agenceForm.value.email,
        mobile: this.agenceForm.value.mobile,
        fixe: this.agenceForm.value.fixe,
        site: this.agenceForm.value.site,
        adresse: this.agenceForm.value.adresse,
        photo: this.agenceForm.value.photo,
        contrat: this.agenceForm.value.contrat,
        cnidg: this.agenceForm.value.cnidg, 
    } 
    return info;
  }

  

  public getContrat() {
    this.fileSaver.saveUrl(this.contratDoc, 'contrat');
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }
//photo
  readUrl(event: any) {
      if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();
        reader.onload = (event: any) => {
          this.url1 = event.target.result;
        }
      
        reader.readAsDataURL(event.target.files[0]);
      }
  }
//contrat
  readUrl1(event: any) {
      if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();
      
        reader.onload = (event: any) => {
          this.url2 = event.target.result;
        }
        this.filename2 = event.target.files[0].name;
        reader.readAsDataURL(event.target.files[0]);
      }
  }
  //cnidg
  readUrl2(event: any) {
      if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();
      
        reader.onload = (event: any) => {
          this.url3 = event.target.result;
        }
        this.filename3 = event.target.files[0].name;
        reader.readAsDataURL(event.target.files[0]);
      }
  }

  readUrlUser(event: any) {
      if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();
      
        reader.onload = (event: any) => {
          this.urlUser = event.target.result;
        }
        this.filenameUser = event.target.files[0].name;
        reader.readAsDataURL(event.target.files[0]);
      }
  }

  delete(id) {
  }

  openErrorModal(id: string) {
    this.errormodalService.open(id);
  }

  closeErrorModal(id: string) {
    this.errormodalService.close(id);
  }

}
