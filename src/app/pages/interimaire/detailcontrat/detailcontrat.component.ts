import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalService } from 'src/app/modal/_modal';
import { DataService } from 'src/app/service/data.service';
import { OthersService } from 'src/app/services/others.service';
import { NgxFileSaverService } from '@clemox/ngx-file-saver';
import { ErrormodalService } from 'src/app/modal/_errormodals';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-detailcontrat',
  templateUrl: './detailcontrat.component.html',
  styleUrls: ['./detailcontrat.component.scss']
})
export class DetailcontratComponent implements OnInit {

  item: any;
  id: any;
  public restant: any;
  public nombre = 59;
  public left: any;
  donnees: any;
  page = 1
  itemsPerPage = 4;
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
  prenom;
  categorie;
  dateDebut;
  dateFin;
  societe;
  departement;
  service;
  direction;
  image;
  diplome;
  numeroPiece;
  domaine;
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
  dataCategorie;
  fileContrat;
  fileFicheposte;
  fileProcesVerbal;
  etat;
  role;
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
  evaluations: any;
  totalItems: any;
  interim_id: any;
  procesVerbal;
  constructor(private activeroute: ActivatedRoute,
              private modalService: ModalService,
              private otherService: OthersService,
              private fileSaver: NgxFileSaverService,
              private http: HttpClient,
              private errormodalService: ErrormodalService,
              public router: Router, ) { 
    this.activeroute.queryParams.subscribe(params => {
      this.item = JSON.parse(params["contrat"]);
      this.interim_id = JSON.parse(params["interimaire"]);
      this.otherService.getOneInterById(this.item).subscribe(
          data =>{
            this.data = data;
            this.dataInter = this.data.data;
            this.nom = this.dataInter.nom;
            this.prenom = this.dataInter.prenom;
        }
      );
    })

    this.otherService.getContratById(this.item).subscribe(
      data =>{
        this.data = data;
        this.dataContrat = this.data.data;
        this.poste = this.dataContrat.poste.libelle;
        this.dateDebut = this.dataContrat.dateDebut;
        this.dateFin = this.dataContrat.dateFin;
        this.societe = this.dataContrat.societe.libelle;
        this.direction = this.dataContrat.structure.direction.libelle;
        this.departement = this.dataContrat.structure.departement;
        this.service = this.dataContrat.structure.service;
        this.categorie = this.dataContrat.categorie;
        this.domaine = this.dataContrat.domaine;
      })
    
  }
  ngOnInit() {
    this.role = localStorage.getItem('user')
    this.gty(this.page)
  }

  gty(page: any){
    this.http.get(this.reqUrl + `/listEvaluations/${this.interim_id}?page=${page}&limit=${this.itemsPerPage}`).subscribe((data: any) => {
      this.data = data
      this.evaluations = this.data["data"];
      this.totalItems = data.total;
    })
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

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }
  
  objectif() {
    this.router.navigate(['accueil/objectif'], {
      queryParams: {
        interimaire: JSON.stringify(this.item)
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