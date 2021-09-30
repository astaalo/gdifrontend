import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, OperatorFunction, Subject, merge } from 'rxjs';
import { map, startWith, debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { DataService } from 'src/app/service/data.service';
import { OthersService } from 'src/app/services/others.service';
import { ModalService } from 'src/app/modal/_modal/modal.service';
import { ErrormodalService } from 'src/app/modal/_errormodals';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-addinter',
  templateUrl: './addinter.component.html',
  styleUrls: ['./addinter.component.scss']
})
export class AddinterComponent implements OnInit {

  societeSearch;
  typePieceSearch;
  numeroPieceSearch;
  isAdmissible = false;
  isBlackliste = true;
  submited = false;
  url1="../../assets/images/default.png";
  url2="../assets/images/default.png";
  url3="../assets/images/default.png";
  url4="../assets/images/default.png";
  interForm: FormGroup;
  isLinear = true;
  photo: any;
  fichierDiplome?: File;
  fichierContrat?: File;
  fichierPoste?: File;
  fichierProceVerbal?: File;
  fichierCni?: File;
  fichierdiplome1?: File;
  fichierdiplome2?: File;
  fichierdiplome3?: File;
  errorMsg: string;
  infoForm : FormGroup;
  formPhoneGroup : FormGroup;
  dataSociete: any;
  dataDirection: any;
  dataAgence: any;
  dataDepartement: any;
  dataCategorie;
  dataDomaine;
  id: any;
  itemd;
  image;
  donneeService;
  itemdept;
  datajson;
  contrat;
  contratDoc;
  fileFicheposte;
  proceverbal;
  fileCni;
  contratName;
  cniName;
  fichedeposteName;
  proceverbalName;
  diplomeName;
  diplomeName1;
  diplomeName2;
  diplomeName3;
  duree;
  keyword = 'name';
  fileDiplome: FormArray;
  ListePiece = [
    {
      id: 1, 
      libelle: "cni",
    },
    {
      id: 2, 
      libelle: "passeport"
    }
  ];
  ListeSexe = [
    {
      libelle: "femme",
    },
    {
      libelle: "homme"
    }
  ];
  ListeSitmat = [
    {
      libelle: "marié(e)",
    },
    {
      libelle: "célibataire"
    },{
      libelle: "divorcé(e)",
    },
    {
      libelle: "veuf(ve)"
    }
  ];
  data;
  successMsg;
  selected1 = false;
  selected2 = false;
  colora = "#ff7900";
  colorb = "#000";
  colorc = "#000";
  color1 = "20px solid #ff7900"
  color2 = "20px solid #000"
  color3 = "20px solid #000";
  listeFonction;
  item;
  dataMatriculeInter;
  prenom;
  nom;
  telephoneSearch;
  telephone;
  sitmat;
  sexe;
  lieuNaissance;
  dateNaissance;
  email;
  universite;
  adresse;
  profession;
  poste;
  searchForm: FormGroup;
  numeroPiece;
  typePiece;
  societe;
  videtypePiece = false;
  videnumeroPiece = false;
  videtelephone = false;
  videsociete = false;
  dataSite: any;
  page = 1;
  itemParPage = 900;
  region = null;
  constructor(private otherService: OthersService,
              private errormodalService: ErrormodalService,
              private toastr: ToastrService,
              private router: Router) {
   // this.datajson = this.dataService.getData();
   }
    
  ngOnInit() {
    this.interForm = new FormGroup({
        numeroPiece: new FormControl(''),
        prenom: new FormControl(''),
        nom: new FormControl(''),
        email: new FormControl(''),
        telephone: new FormControl(''),
        dateNaissance: new FormControl(''),
        lieuNaissance: new FormControl(''),
        sexe: new FormControl(''),
        sitmat: new FormControl(''),
        adresse: new FormControl(''),
        nPassport: new FormControl(''),
        diplome: new FormControl(''),
        universite: new FormControl(''),
        photo: new FormControl(''),
        dateDebut: new FormControl(''),
        dateFin: new FormControl(''),
        dateSignature: new FormControl(''),
        categorieId: new FormControl(''),
        salaireBrut: new FormControl(''),
        structureId: new FormControl(''),
        domaineId: new FormControl(''),
        directionId: new FormControl(''),
        departementId: new FormControl(''),
        societeId: new FormControl(''),
        profession: new FormControl(''),
        poste: new FormControl(''),
        site: new FormControl(''),
        contratDoc: new FormControl(''),
        matriculeManager: new FormControl(''),
        fileFicheposte: new FormControl(''),
        fileproceverbal: new FormControl(''),
        fileCni: new FormControl(''),
        typePiece: new FormControl(''),
        diplome1: new FormControl(''),
        diplome2: new FormControl(''),
        diplome3: new FormControl(''),
        fonction: new FormControl('')
    });
    this.searchForm = new FormGroup({
      numeroPiece: new FormControl(''),
      societe: new FormControl(''),
      telephone: new FormControl(''),
      typePiece: new FormControl(''),
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
    this.otherService.listeSite(this.page, this.itemParPage, this.region).subscribe(
      data => {
        console.log(data.data);
        this.dataSite = data.data;
      }
    )
    this.otherService.getDomaine().subscribe(data => this.dataDomaine = data["data"]);
    this.otherService.getFonctions().subscribe(data => this.listeFonction = data.data);
  }
  
  public saveProfession(e): void {
    let libelle = e.target.value;
    let list = this.listeFonction.filter(x => x.libelle === libelle)[0];
    this.interForm.patchValue({profession: list.libelle});
  }
  public savePoste(e): void {
    let libelle = e.target.value;
    let list = this.listeFonction.filter(x => x.libelle === libelle)[0];
    this.interForm.patchValue({poste: list.libelle});
  }

  public saveDomaine(e): void {
    let libelle = e.target.value;
    let list = this.dataDomaine.filter(x => x.libelle === libelle)[0];
    this.interForm.patchValue({domaineId: list.id});
  }
  
  rechercherInterimaire() { 
    this.typePiece = this.searchForm.value.typePiece;
    this.numeroPiece = this.searchForm.value.numeroPiece;
    this.telephone = this.searchForm.value.telephone;
    this.societe = this.searchForm.value.societe;
    if(!this.typePiece) {
      this.videtypePiece = true;
    } else {
      this.videtypePiece = false;
    }
    if(!this.numeroPiece) {
      this.videnumeroPiece = true;
    } else {
      this.videnumeroPiece = false;
    }
    if(!this.telephone) {
      this.videtelephone = true;
    } else {
      this.videtelephone = false;
    }
    if(!this.societe) {
      this.videsociete = true;
    } else {
      this.videsociete = false;
    }
    if(this.typePiece && this.numeroPiece && this.telephone && this.societe) {
      this.otherService.pieceFilter(this.searchForm.value).subscribe(
        (response) => {
          this.dataMatriculeInter = response;
          this.isBlackliste = this.dataMatriculeInter.isBlacklisted
          if(this.isBlackliste == false) {
            if(this.dataMatriculeInter.data) {
              if(this.dataMatriculeInter.data.interimaire) {
                this.toastr.info('Cette personne existe deja comme interimaire veuillez l\'ajouter un contrat à partir de la page détail intérimaire', 'Information', {
                  timeOut: 10000,
                });
                this.router.navigate(['/accueil/detailinter'], {
                  queryParams: {
                    user: JSON.stringify(this.dataMatriculeInter.data.interimaire.id)
                  }
                });
              } else {
                this.toastr.success('Vous pouvez ajouter cette personne comme interimaire', 'Success', {
                  timeOut: 3000,
                });
                this.isAdmissible = true;
              }
            }
            if(this.dataMatriculeInter.message == 'Interimaire inexistant!') {
              this.toastr.success('Vous pouvez ajouter cette personne comme interimaire', 'Success', {
                timeOut: 3000,
              });
              this.isAdmissible = true;
            }
          } else if(this.isBlackliste == true) {
            if(this.dataMatriculeInter.data.personne) {
              this.prenom = this.dataMatriculeInter.data.personne.prenom;
              this.nom = this.dataMatriculeInter.data.personne.nom;
            } else {
              this.prenom = "cette";
              this.nom = "personne";
            }
            this.openErrorModal('blacklist-modal-1');
          }
        }
      );
    }
  }
  
  get diplome(): FormArray {
    return this.interForm.get('fileDiplome') as FormArray;
  }
  addNameField() { 
    this.diplome.push(new FormControl('', Validators.required)); 
  }

  addDiplome1() {
    this.selected1 = true;
  }
  addDiplome2() {
    this.selected2 = true;
  }
  deleteDiplome2() {
    this.selected1 = false;
  }
  deleteDiplome3() {
    this.selected2 = false;
  }

  //recuperation du fiche de poste
  getDiplomes(e:any) {
    this.fichierDiplome= e.target.files.item(0);
    for (let i = 0; i < this.diplome.length; i++) {
      this.diplomeName = this.fichierDiplome.name;
    }
  }
  submitted1(){
    this.colora = "#f16e00";
    this.colorb = "#ff7900";
    this.color1 = "20px solid #f16e00";
    this.color2 = "20px solid #ff7900";
  }
  submitted2(){
    this.colorb = "#f16e00";
    this.colorc = "#ff7900";
    this.color2 = "20px solid #f16e00";
    this.color3 = "20px solid #ff7900";
  }
  submit() {
    console.log(this.interForm.value.poste);
    
    this.colorc = "#f16e00";
    this.color3 = "20px solid #f16e00";
    const formdata = new FormData();
    formdata.append("societeId", this.interForm.value.societeId);
    formdata.append("structureId",this.interForm.value.structureId);
    formdata.append("domaineId",this.interForm.value.domaineId);
    formdata.append("typePiece",this.interForm.value.typePiece);
    formdata.append("numeroPiece",this.interForm.value.numeroPiece);
    formdata.append("nom",this.interForm.value.nom);
    formdata.append("prenom",this.interForm.value.prenom);
    formdata.append("adresse",this.interForm.value.adresse);
    formdata.append("email",this.interForm.value.email);
    formdata.append("telephone",this.interForm.value.telephone);
    formdata.append("universite",this.interForm.value.universite);
    formdata.append("sexe",this.interForm.value.sexe);
    formdata.append("profession",this.interForm.value.profession);
    formdata.append("categorieId",this.interForm.value.categorieId);
    formdata.append("sitmat",this.interForm.value.sitmat);
    formdata.append("salaireBrut",this.interForm.value.salaireBrut);
    formdata.append("dateNaissance",this.interForm.value.dateNaissance);
    formdata.append("lieuNaissance",this.interForm.value.lieuNaissance);
    
    if(this.interForm.value.categorieId != "") {
      formdata.append("categorieId", this.interForm.value.categorieId);
    }
    if(this.interForm.value.salaireBrut != "") {
      formdata.append("salaireBrut", this.interForm.value.salaireBrut);
    }
    if(this.interForm.value.site != "") {
      formdata.append("site", this.interForm.value.site);
    }
    if(this.interForm.value.dateDebut != "") {
      formdata.append("dateDebut", this.interForm.value.dateDebut);
    }
    if(this.interForm.value.dateFin != "") {
      formdata.append("dateFin", this.interForm.value.dateFin);
    }
    if(this.interForm.value.domaineId != "") {
      formdata.append("domaineId", this.interForm.value.domaineId);
    }
    if(this.interForm.value.dateSignature != "") {
      formdata.append("dateSignature", this.interForm.value.dateSignature);
    }
    if(this.interForm.value.poste != "") {
      formdata.append("fonction", this.interForm.value.poste);
    }
    if(this.fichierContrat != undefined) {
      formdata.append("contratDoc",this.fichierContrat);
    }
    if(this.fichierCni != undefined) {
      formdata.append("fileCni",this.fichierCni);
    }
    if(this.fichierPoste != undefined) {
      formdata.append("fileFicheposte",this.fichierPoste);
    }
    if(this.fichierProceVerbal != undefined) {
      formdata.append("fileproceverbal",this.fichierProceVerbal);
    }
    if(this.photo != undefined) {
      formdata.append("photo",this.photo);
    }
    if(this.fichierdiplome1 != undefined) {
      formdata.append("fileDiplome[]",this.fichierdiplome1);
    }
    if(this.fichierdiplome2 != undefined) {
      formdata.append("fileDiplome[]",this.fichierdiplome2);
    }
    if(this.fichierdiplome3 != undefined) {
      formdata.append("fileDiplome[]",this.fichierdiplome3);
    }
    this.otherService.addInter(formdata).subscribe(
      data => {
        this.data = data
        this.successMsg = this.data.status
        if(this.successMsg == true) {
          this.toastr.success('L\'intérimaire a été ajouté', 'Success', {
            timeOut: 3000,
          });
          this.submited = true;
        }
      }, error=> {
        this.errorMsg = error;
        this.toastr.error(this.errorMsg, 'Echec', {
          timeOut: 5000,
        });
      }
    )
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

   getPhoto(e:any) {
    this.photo= e.files.item(0);
    let reader = new FileReader();
    reader.readAsDataURL( this.photo)
    reader.onload= ()=>{
      this.image= reader.result
    }
  }

  //recuperation du  contrat
  getFileContrat(event: any) {
    this.fichierContrat = event.target.files[0];
    this.contratName = this.fichierContrat.name;
  }

  //les diplomes
  getDiplome1(event: any) {
    this.fichierdiplome1 = event.target.files[0];
    this.diplomeName1 = this.fichierdiplome1.name;
    console.log(this.diplomeName1);
  }
  getDiplome2(event: any) {
    this.fichierdiplome2 = event.target.files[0];
    this.diplomeName2 = this.fichierdiplome2.name;
  }
  getDiplome3(event: any) {
    this.fichierdiplome3 = event.target.files[0];
    this.diplomeName3 = this.fichierdiplome3.name;
  }

   //recuperation  du proceverbal
   getProceVerbal(e:any) {
    this.fichierProceVerbal= e.target.files.item(0);
    this.proceverbalName = this.fichierProceVerbal.name;
  }

   //recuperation du fiche de poste
   getFichePoste(e:any) {
    this.fichierPoste= e.target.files.item(0);
    this.fichedeposteName = this.fichierPoste.name;
  }

  

  getFileCni(e:any) {
    this.fichierCni= e.target.files.item(0);
    this.cniName = this.fichierCni.name;
    
  }

  removeItem() {
    this.colora = "#ff7900";
    this.colorb = "#000";
    this.colorc = "#000";
    this.color1 = "20px solid #ff7900"
    this.color2 = "20px solid #000"
    this.color3 = "20px solid #000"
    this.submited = false;
    this.url1="../assets/images/default.png";
    this.url2="../assets/images/default.png";
    this.url3="../assets/images/default.png";
    this.ngOnInit();
  }
  openErrorModal(id: string) {
    this.errormodalService.open(id);
  }

  closeErrorModal(id: string) {
    this.errormodalService.close(id);
  }
}

