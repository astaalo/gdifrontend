import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl } from '@angular/forms';
import { DataService } from '../../../service/data.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalService } from 'src/app/modal/_modal/modal.service';
import { NgxFileSaverService } from '@clemox/ngx-file-saver';
import { OthersService } from 'src/app/services/others.service';
import { formatCurrency } from '@angular/common';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ErrormodalService } from 'src/app/modal/_errormodals';

@Component({
  selector: 'app-detailinter',
  templateUrl: './detailinter.component.html',
  styleUrls: ['./detailinter.component.scss']
})
export class DetailinterComponent implements OnInit {

  item: any;
  id: any;
  user: any;
  public restant: any;
  public nombre = 59;
  public left: any;
  donnees: any;
  page = 1
  showButton;
  itemsPerPage = 7;
  dataInter:any;
  dataContrat: any;
  dataManageur;
  viewer = 'google';  
  selectedType = 'docx';   
  contratDoc;
  fichePosteDoc=""
  proceVerbalDoc="" 
  dataValidation;
  dataReconduire;
  dataRenouveler;
  dataBannir;
  dataArret;
  data;
  nom;
  dataInterim;
  role;
  prenom;
  datedenaissance;
  lieudenaissance;
  telephone;
  sitmat;
  adresse;
  agence;
  photo;
  image;
  categorie;
  diplome;
  numeroPiece;
  email;
  profession;
  matricule;
  salaireBrut;
  dateSignature;
  universite;
  sexe;
  direction;
  sameIdSociete;
  departement;
  service;
  contratForm: FormGroup;
  arretForm: FormGroup;
  bannirForm: FormGroup;
  reconduireForm: FormGroup;
  validerForm: FormGroup;
  filenamecontrat;
  filenamefichedeposte;
  filenameProceVerbal;
  urlcontrat;
  urlfichedeposte;
  urlProcesVerbal;
  dataSociete: any;
  dataDirection: any;
  dataAgence: any;
  dataDepartement: any;
  donneeService: any;
  dataCategorie;
  fileContrat;
  fileFicheposte;
  fileProcesVerbal;
  etat;
  societeIdDrh;
  societeIdInterim;
  societeData;
  url3;
  url2;
  filename3;
  filename2;
  successMsgValider;
  successMsgReconduire;
  successMsgRenouveler;
  successMsgBannir;
  successMsgArret;
  public reqUrl = environment.base_url;
  errorMsg: any;
  constructor(private activeroute: ActivatedRoute,
              private modalService: ModalService,
              private otherService: OthersService,
              private fileSaver: NgxFileSaverService,
              private errormodalService: ErrormodalService,
              private http: HttpClient,
              public router: Router, 
              private toastr: ToastrService) { 
    this.activeroute.queryParams.subscribe(params => {
      this.item = JSON.parse(params["user"]);
      this.otherService.getOneInterById(this.item).subscribe(
          data =>{
            this.data = data;
            this.dataInter = this.data.data;
            this.nom = this.dataInter.nom;
            this.prenom = this.dataInter.prenom;
            this.datedenaissance = this.dataInter.datedenaissance;
            this.lieudenaissance = this.dataInter.lieudenaissance;
            this.numeroPiece = this.dataInter.numeroPiece;
            this.diplome = this.dataInter.diplome;
            this.email = this.dataInter.email;
            this.adresse = this.dataInter.adresse;
            this.profession = this.dataInter.profession;
            this.salaireBrut = this.dataInter.salaireBrut;
            this.profession = this.dataInter.profession;
            this.telephone = this.dataInter.telephone;
            this.universite = this.dataInter.universite;
            this.sitmat = this.dataInter.sitmat;
            this.direction = this.dataInter.direction;
            this.departement = this.dataInter.departement;
            this.service = this.dataInter.service;
            this.agence = this.dataInter.agence;
            this.categorie = this.dataInter.categorie;
            this.dateSignature = this.dataInter.dateSignature;
            this.matricule = this.dataInter.matricule;
            this.sexe = this.dataInter.sexe;
            this.photo = this.dataInter.photo;
            this.etat = this.dataInter.etat;
            this.contratDoc = this.dataInter.fileContrat;
            this.fichePosteDoc = this.dataInter.fileFichePoste;
        }
      );
    })
    
  }
  ngOnInit() {
    this.role = localStorage.getItem('user');
    this.societeData = JSON.parse(localStorage.getItem('currentUser'));
    this.societeIdDrh=this.societeData.data.societeId;
    this.otherService.getOneInterById(this.item).subscribe(
      data =>{
        this.data = data;
        this.societeIdInterim = this.data.data.societe.id;
        if(this.societeIdDrh == this.societeIdInterim) {
          this.sameIdSociete = true;
        } else {
          this.sameIdSociete = false;
        }
      });
    


    if(this.user == 'DRH') {
      this.showButton = false;
    } else {
      this.showButton = true;
    }
   
    
    this.contratForm = new FormGroup({
      categorieId: new FormControl(''),
      salaireBrut: new FormControl(''),
      dateDebut: new FormControl(''),
      dateFin: new FormControl(''),
      dateSignature: new FormControl(''),
      societeId: new FormControl(''),
      directionId: new FormControl(''),
      departementId: new FormControl(''),
      structureId: new FormControl(''),
      profession: new FormControl(''),
      poste: new FormControl(''),
      contrat: new FormControl(''),
      fichePoste: new FormControl(''),
      interimaireId: new FormControl(''),
      procesVerbal: new FormControl(''),
    });
    this.validerForm = new FormGroup({
      matricule: new FormControl(''),
      telephone: new FormControl(''),
      responsable: new FormControl('')
    })
    this.otherService.getAllSociete().subscribe(
      data => {
        this.dataSociete = data["data"];
      }
    );
    this.otherService.getAllCategorie().subscribe(
      data => {
        this.dataCategorie = data["data"];
      }
    );
    this.arretForm = new FormGroup({
      motif: new FormControl(''),
    });
    this.bannirForm = new FormGroup({
      libelle: new FormControl(''),
      commentaire: new FormControl(''),
    });
    this.gty(this.page);
  }


  

  gty(page: any){
    this.http.get(this.reqUrl + `/managers/list?page=${page}&limit=${this.itemsPerPage}`).subscribe((data: any) => {
      this.dataManageur =  data.data;
    })
  }

  public saveMatriculeM(e): void {
    let matricule = e.target.value;
    let list = this.dataManageur.filter(x => x.matricule === matricule)[0];
    this.validerForm.patchValue({profession: list.matricule});
  }

  directionsListe(value) {
    this.otherService.getAllDirection(value).subscribe(
      data => {
        this.dataDirection = data['data'];
       }
    ); 
  }

  departementListe(value) {
    this.otherService.getAllDepartement(value).subscribe(
      data => {
        this.dataDepartement = data['data'];
      }
    ); 
  }

  serviceListe(value) {
    this.otherService.getAllService(value).subscribe(
      data => {
        this.donneeService = data['data'];
      }
    ); 
  }

  public get(p) {
    this.fileSaver.saveUrl(p.pathfile, p.file);
  }
  public getContrat() {
    this.fileSaver.saveUrl(this.contratDoc, 'contrat');
  }

  public getFicheDePoste() {
    this.fileSaver.saveUrl(this.fichePosteDoc, 'fiche de Poste');
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

  modifierInter() {
    this.router.navigate(['accueil/modifierinter'], {
      queryParams: {
        user: JSON.stringify(this.item)
      }
    })
  }
  
  renouvelerContrat() {
    this.contratForm.patchValue({interimaireId: this.item});
    const formdata = new FormData();
    formdata.append("societeId",this.contratForm.value.societeId);
    formdata.append("structureId",this.contratForm.value.structureId);
    formdata.append("domaineId",this.contratForm.value.domaineId);
    formdata.append("salaireBrut",this.contratForm.value.salaireBrut);
    formdata.append("interimaireId",this.item);
    formdata.append("categorieId",this.contratForm.value.categorieId);
    formdata.append("dateDebut",this.contratForm.value.dateDebut);
    formdata.append("dateFin",this.contratForm.value.dateFin);
    formdata.append("dateSignature",this.contratForm.value.dateSignature);
    formdata.append("profession",this.contratForm.value.profession);
    formdata.append("poste",this.contratForm.value.poste);
    formdata.append("contrat",this.urlcontrat);
    formdata.append("fichePoste",this.urlfichedeposte);
    formdata.append("procesVerbal",this.urlProcesVerbal);
    this.otherService.renouvelerContrat(formdata).subscribe(
      data => {
        this.dataRenouveler = data;
        this.successMsgRenouveler = this.dataRenouveler.status;
        if(this.successMsgRenouveler == true){
          this.ngOnInit();
          this.closeModal('custom-modal-4');
          this.toastr.success(this.dataRenouveler.message, 'Success', {
            timeOut: 3000,
          });
        }
      },
      error=> {
        this.errorMsg = error;
        this.toastr.error(this.errorMsg, 'Echec', {
          timeOut: 5000,
        });
      }
    )
  }

  reconduireContrat() {
    this.contratForm.patchValue({interimaireId: this.item});
      const formdata = new FormData();
    formdata.append("dateSignature",this.contratForm.value.dateSignature);
    formdata.append("dateDebut",this.contratForm.value.dateDebut);
    formdata.append("dateFin",this.contratForm.value.dateFin);
    formdata.append("interimaireId",this.item);
    formdata.append("fileContrat",this.urlcontrat);
    this.otherService.reconduireContrat(formdata).subscribe(
      data => {
        this.dataReconduire = data;
        this.successMsgReconduire = this.dataReconduire.status;
        if(this.successMsgReconduire == true){
          this.ngOnInit();
          this.closeModal('custom-modal-5');
          this.toastr.success(this.dataReconduire.message, 'Succes', {
            timeOut: 3000,
          });
        } 
      },
      error=> {
        this.errorMsg = error;
        this.toastr.error(this.errorMsg, 'Echec', {
          timeOut: 5000,
        });
      }
    )
  }
  objectif() {
    this.router.navigate(['accueil/objectif'], {
      queryParams: {
        interimaire: JSON.stringify(this.item)
      }
    })
  } 
  evaluation() {
    this.router.navigate(['accueil/listeevaluation'], {
      queryParams: {
        interimaire: JSON.stringify(this.item)
      }
    })
  } 
  historiqueContrat() {
    this.router.navigate(['accueil/historiquecontrat'], {
      queryParams: {
        interimaire: JSON.stringify(this.item)
      }
    })
  } 

  validerInterimaire() {
    this.otherService.validerInterimaire(this.validerForm.value, this.item).subscribe(
      data => {
        this.dataValidation = data;
        this.successMsgValider = this.dataValidation.status;
        if(this.successMsgValider == true) {
          this.closeModal('custom-modal-8');
          this.toastr.success(this.dataValidation.message, 'Success', {
            timeOut: 3000,
          });
          this.router.navigate(['accueil/souscontrat']);
        }
      }, error=> {
        this.errorMsg = error;
        this.toastr.error(this.errorMsg, 'Echec', {
          timeOut: 5000,
        });
      }
    )
  }

  getPhoto(e:any) {
    this.photo= e.files.item(0);
    let reader = new FileReader();
    reader.readAsDataURL(this.photo)
    reader.onload= ()=>{
      this.image= reader.result
    } 
  }

  contrat(e:any) {
    this.urlcontrat= e.files.item(0);
    this.filenamecontrat = this.urlcontrat.name;
    let reader = new FileReader();
    reader.readAsDataURL( this.urlcontrat)
    reader.onload= ()=>{
    }
  }
  fichedeposte(e:any) {
    this.urlfichedeposte= e.files.item(0);
    this.filenamefichedeposte = this.urlfichedeposte.name;
    let reader = new FileReader();
    reader.readAsDataURL( this.urlfichedeposte)
    reader.onload= ()=>{
    }
  }
  procesVerbal(e:any) {
    this.urlProcesVerbal= e.files.item(0);
    this.filenameProceVerbal = this.urlProcesVerbal.name;
    let reader = new FileReader();
    reader.readAsDataURL( this.urlProcesVerbal)
    reader.onload= ()=>{
    }
  }
  arretContrat() {
    this.otherService.arreterContrat(this.dataInter.contrat.id, this.arretForm.value).subscribe(
      (response) =>{
        this.dataArret = response;
        this.successMsgArret = this.dataArret.status;
        if(this.successMsgArret == true) {
          this.closeModal('custom-modal-6');
          this.ngOnInit();
          this.toastr.success(this.dataArret.message, 'Success', {
            timeOut: 3000,
          });
        }
      },
      error=> {
        this.errorMsg = error;
        this.toastr.error(this.errorMsg, 'Echec', {
          timeOut: 5000,
        });
      }
    );
  }
  bloquerInterimaire() {
    this.otherService.bolquerInter(this.item, this.bannirForm.value).subscribe(
      (response) =>{
        this.dataBannir = response;
        this.successMsgBannir = this.dataBannir.status;
        if(this.successMsgBannir == true) {
          this.closeModal('custom-modal-7');
          this.ngOnInit();
          this.toastr.success(this.dataBannir.message, 'Success', {
            timeOut: 3000,
          });
        }
      }, error=> {
        this.errorMsg = error;
        this.toastr.error(this.errorMsg, 'Echec', {
          timeOut: 5000,
        });
      }
    );
  }
  openErrorModal(id: string) {
    this.errormodalService.open(id);
  }

  closeErrorModal(id: string) {
    this.errormodalService.close(id);
  }
}
