import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { OthersService } from 'src/app/services/others.service';
import { Component, OnInit } from '@angular/core';
import { NgxFileSaverService } from '@clemox/ngx-file-saver';
import { DataService } from 'src/app/service/data.service';
import { ModalService } from 'src/app/modal/_modal/modal.service';
import { ErrormodalService } from 'src/app/modal/_errormodals';

@Component({
  selector: 'app-compte',
  templateUrl: './compte.component.html',
  styleUrls: ['./compte.component.scss']
})
export class CompteComponent implements OnInit {

  public restant: any;
  public nombre = 29;
  public left: any;

  datas: any;
  objetctis = [
    {
      title: "Objectif 1",
      libelle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    },
    {
      title: "Objectif 2",
      libelle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    },
  ];
  data;
  user;
  id;
  currentUser;
  showHome = true;
  viewer = 'google';  
  selectedType = 'docx';
  item: any;
  donnees: any;
  dataInter:any;
  dataContrat: any;
  contratDoc="" 
  fichePosteDoc=""
  proceVerbalDoc="" 
  nom;
  prenom;
  pole;
  datedenaissance;
  lieudenaissance;
  telephone;
  sitmat;
  adresse;
  agence;
  photo;
  dateFin;
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
  structure;
  direction;
  departement;
  service;
  filenamecontrat;
  filenamefichedeposte;
  urlcontrat;
  urlfichedeposte;
  dataSociete: any;
  dataDirection: any;
  dataAgence: any;
  dataDepartement: any;
  donneeService: any;
  dataCategorie;
  fileContrat;
  fileFicheposte;
  contrat;
  DemoDoc="http://www.africau.edu/images/default/sample.pdf" 
  DemoDoc1="https://file-examples.com/wp-content/uploads/2017/02/file-sample_100kB.doc"
  DemoDoc2="https://www.le.ac.uk/oerresources/bdra/html/resources/example.txt" 
  errorMsg: any;
  constructor(private fileSaver: NgxFileSaverService,
    private otherService: OthersService,
    private modalService: ModalService,
    private dataService: DataService,
    private toastr: ToastrService,
    private errormodalService: ErrormodalService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.otherService.getOneInterById(this.currentUser.interimaire.id).subscribe(
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
       this.contratDoc = this.dataInter.fileContrat;
       this.fichePosteDoc = this.dataInter.fileFichePoste;
       this.contrat = this.dataInter.contrat;
    },
  );

    if(this.user == 'inter') {
      this.showHome = false;
    } else {
      this.showHome = true;
    }
    this.datas = this.dataService.getData();
  }

  evaluation() {
    this.router.navigate(['accueil/listeevaluation'], {
      queryParams: {
        interimaire: JSON.stringify(this.currentUser.interimaire.id)
      }
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

  public get(p) {
    this.fileSaver.saveUrl(p.pathfile, p.file);
  }

  public getfilemodal() {
    this.fileSaver.saveUrl(this.DemoDoc, 'contrat');
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }
  objectif() {
    this.router.navigate(['accueil/mesobjectif'], {
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
 