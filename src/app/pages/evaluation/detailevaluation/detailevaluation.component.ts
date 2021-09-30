import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalService } from 'src/app/modal/_modal';
import { DataService } from 'src/app/service/data.service';
import { OthersService } from 'src/app/services/others.service';
import { NgxFileSaverService } from '@clemox/ngx-file-saver';
import { ErrormodalService } from 'src/app/modal/_errormodals';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-detailevaluation.',
  templateUrl: './detailevaluation.component.html',
  styleUrls: ['./detailevaluation.component.scss']
})
export class DetailevaluationComponent implements OnInit {

  item: any;
  id: any;
  public restant: any;
  public nombre = 59;
  public left: any;
  donnees: any;
  page = 1
  itemsPerPage = 3;
  totalItems;
  dataInter:any;
  dataEvaluation: any;
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
  prenom;
  note;
  dateDebut;
  dateFin;
  societe;
  departement;
  service;
  direction;
  image;
  diplome;
  numeroPiece;
  commentaire;
  email;
  poste;
  matricule;
  salaireBrut;
  dateSignature;
  universite;
  sexe;
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
  datanote;
  fileContrat;
  fileFicheposte;
  fileProcesVerbal;
  etat;
  role;
  url3;
  interim_id;
  url2;
  filename3;
  interimaire_id;
  filename2;
  successMsgValider;
  successMsgReconduire;
  successMsgRenouveler;
  successMsgBannir;
  successMsgArret;
  objectif;
  public reqUrl = environment.base_url;
  errorMsg: any;
  constructor(private activeroute: ActivatedRoute,
              private modalService: ModalService,
              private otherService: OthersService,
              private errormodalService: ErrormodalService,
              private http: HttpClient,
              public router: Router, ) { 
    this.activeroute.queryParams.subscribe(params => {
      this.item = JSON.parse(params["evaluation"]);
      this.interim_id = JSON.parse(params["interimaire"]);
      this.otherService.getOneInterById(this.interim_id).subscribe(
        data =>{
          this.data = data;
          this.dataInter = this.data.data;
          this.nom = this.dataInter.nom;
          this.prenom = this.dataInter.prenom;
        }
      );
    })

    this.otherService.getOneEvaluation(this.item).subscribe(
      data =>{
        this.data = data;
        this.dataEvaluation = this.data.data;
        this.dateDebut = this.dataEvaluation.dateDebut;
        this.dateFin = this.dataEvaluation.dateFin;
        this.note = this.dataEvaluation.note;
        this.commentaire = this.dataEvaluation.commentaire;
      }
    )
    
  }
  ngOnInit() {
    this.role = localStorage.getItem('user')
    this.gty(this.page);
  }

  gty(page: any){
    this.http.get(this.reqUrl + `/objectif/${this.interim_id}/${this.item}?page=${page}&limit=${this.itemsPerPage}`).subscribe((data: any) => {
      this.data = data
      this.totalItems = data.total;
      this.objectif = this.data["data"];
    })
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }
  
  openObjectif() {
    this.router.navigate(['accueil/objectif'], {
      queryParams: {
        interimaire: JSON.stringify(this.item)
      }
    })
  } 

  ModifierEvaluation() {
    this.router.navigate(['/accueil/modifevaluer'], {
      queryParams: {
        interimaire: JSON.stringify(this.interim_id),
        evaluation: JSON.stringify(this.item),
      }
    })
  }

  openEvaluer() {
    this.router.navigate(['/accueil/evaluer'], {
      queryParams: {
        interimaire: JSON.stringify(this.interim_id),
      }
    })
  }

  openErrorModal(id: string) {
    this.errormodalService.open(id);
  }

  closeErrorModal(id: string) {
    this.errormodalService.close(id);
  }

}
