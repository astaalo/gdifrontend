import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import { OthersService } from 'src/app/services/others.service';
import { ErrormodalService } from 'src/app/modal/_errormodals';

@Component({
  selector: 'app-modifierinter',
  templateUrl: './modifierinter.component.html',
  styleUrls: ['./modifierinter.component.scss']
})
export class ModifierinterComponent implements OnInit {

  item;
  filecontrat;
  fileCni;
  fileFicheposte;
  fileproceverbal;
  diplome;
  sommes: any = [
    '20.000f', 
    '30.000f', 
    '40.000f', 
    '50.000f',
    '60.000f',
    '70.000f',
    '80.000f', 
  ];
  submited = false;
  matricule = "Tmp_02568";
  url1="../../../assets/images/{{item.photo}}";
  url2="../assets/images/{{item.photo}}";
  url3="../assets/images/{{item.photo}}";
  url4="../assets/images/{{item.photo}}";
  colora = "#ff7900";
  colorb = "#000";
  colorc = "#000";
  color1 = "20px solid #ff7900"
  color2 = "20px solid #000"
  color3 = "20px solid #000"
  interForm: FormGroup;
  isLinear = true;
  infoForm : FormGroup;
  contactForm : FormGroup;
  posteForm : FormGroup;
  formPhoneGroup : FormGroup;
  datas: any;
  dataSociete;
  dataDirection;
  dataDepartement;
  donneeService;
  dataInter;
  nomUpdate;
  structureId;
  directionId;
  departementId;
  societeId;
  prenom;
  nom;
  adresse;
  numeroPiece;
  profession;
  dateNaissance;
  lieuNaissance;
  dateSignature
  sexe;
  dateDebut;
  dateFin;
  sitmat;
  email;
  dataDomaine;
  categorieId;
  ficheposte;
  proceverbal;
  telephone;
  categorie;
  salaireBrut;
  typePiece;
  agence;
  structure;
  direction;
  departement;
  service;
  photo;
  photoUpload;
  image;
  universite;
  dataCategorie;
  fichierDiplome?: File;
  fichierContrat?: File;
  fichierPoste?: File;
  fichierProceVerbal?: File;
  fichierCni?: File;
  fichierdiplome1?: File;
  fichierdiplome2?: File;
  fichierdiplome3?: File;
  fichierDiplomeUpload: File;
  fichierContratUpload: File;
  fichierPosteUpload: File;
  fichierProceVerbalUpload: File;
  fichierCniUpload: File;
  fichierdiplome1Upload: File;
  fichierdiplome2Upload: File;
  fichierdiplome3Upload: File;
  contratName;
  societeName;
  cniName;
  fichedeposteName;
  proceverbalName;
  lesDiplome;
  lesDiplomeUpload;
  diplomeName;
  diplomeName1;
  diplomeName2;
  diplomeName3;
  structureName;
  idDiplome1;
  idDiplome2;
  idDiplome3;
  ListePiece = [
    {
      libelle: "cni",
    },
    {
      libelle: "passeport"
    }
  ];
  info = new FormData();
  errorMsg: any;
  data: any;
  successMsg: any;
  constructor(private activeroute: ActivatedRoute,
    private route: Router,
    private errormodalService: ErrormodalService,
    private otherService: OthersService,
    private toastr: ToastrService) {
      this.activeroute.queryParams.subscribe(params => {
        this.item = JSON.parse(params["user"]);
        this.otherService.getOneInterById(this.item).subscribe(
          data =>{
            this.dataInter = data;
            this.photo = this.dataInter.data.photo;
            this.prenom = this.dataInter.data.prenom;
            this.nom = this.dataInter.data.nom;
            this.adresse = this.dataInter.data.adresse;
            this.numeroPiece = this.dataInter.data.numeroPiece;
            this.typePiece = this.dataInter.data.typePiece;
            this.profession = this.dataInter.data.profession;
            this.email = this.dataInter.data.email;
            this.sitmat = this.dataInter.data.sitmat;
            this.matricule = this.dataInter.data.matricule;
            this.dateNaissance = this.dataInter.data.datedenaissance;
            this.lieuNaissance = this.dataInter.data.lieudenaissance;
            this.dateSignature = this.dataInter.data.contrat.dateSignature;
            this.sexe = this.dataInter.data.sexe;
            this.dateDebut = this.dataInter.data.contrat.dateDebut;
            this.dateFin = this.dataInter.data.contrat.dateFin;
            this.departementId = this.dataInter.data.structure.departement;
            this.structureId = this.dataInter.data.structure.id;
            this.structureName = this.dataInter.data.structure.libelle;
            this.directionId = this.dataInter.data.structure.direction;
            this.societeId = this.dataInter.data.structure.societe;
            this.salaireBrut = this.dataInter.data.salaire_brut;
            this.categorie = this.dataInter.data.categorie.libelle;
            this.categorieId = this.dataInter.data.categorie.id;
            this.telephone = this.dataInter.data.telephone;
            this.fichierPoste = this.dataInter.data.fileFichePoste;
            this.fichierContrat = this.dataInter.data.fileContrat;
            this.fichierProceVerbal = this.dataInter.data.proceverbal;
            this.universite = this.dataInter.data.universite;
            this.agence = this.dataInter.data.agence;
          }
        );
      })
  }

  ngOnInit() {
    this.interForm = new FormGroup({
        numeroPiece: new FormControl(''),
        prenom: new FormControl(''),
        nom: new FormControl(''),
        email: new FormControl(''),
        adresse: new FormControl(''),
        dateNaissance: new FormControl(''),
        lieuNaissance: new FormControl(''),
        sexe: new FormControl(''),
        dateSignature: new FormControl(''),
        sitmat: new FormControl(''),
        universite: new FormControl(''),
        photo: new FormControl(''),
        typePiece: new FormControl(''),
        agence: new FormControl(''),
        dateDebut: new FormControl(''),
        dateFin: new FormControl(''),
        categorieId: new FormControl(''),
        salaireBrut: new FormControl(''),
        structureId: new FormControl(''),
        direction: new FormControl(''),
        societeId: new FormControl(''),
        departement: new FormControl(''),
        filecontrat: new FormControl(''),
        profession: new FormControl(''),
        telephone: new FormControl(''),
        matriculemanager: new FormControl(''),
        fileCni: new FormControl(''),
        fileFicheposte: new FormControl(''),
        fileproceverbal: new FormControl(''),
        fileDiplome: new FormArray([
          new FormGroup({
            id: new FormControl(''),
            diplome: new FormControl('')
          }),
          new FormGroup({
            id: new FormControl(''),
            diplome: new FormControl('')
          }),
          new FormGroup({
            id: new FormControl(''),
            diplome: new FormControl('')
          }),
        ])
    });

    this.otherService.getAllSociete().subscribe(
      data => {
        this.dataSociete = data["data"];
      }
    );
    this.otherService.getDomaine().subscribe(
      data => {
        this.dataDomaine = data["data"];
      }
    );
    this.otherService.getAllCategorie().subscribe(
    data => {
      this.dataCategorie = data["data"];
    }
  );
  }

  get f() { return this.interForm.controls; }
  submitted1() {
    this.colora = "#f16e00";
    this.colorb = "#ff7900";
    this.color1 = "20px solid #f16e00";
    this.color2 = "20px solid #ff7900";
  }
  submitted2() {
    this.colorb = "#f16e00";
    this.colorc = "#ff7900";
    this.color2 = "20px solid #f16e00";
    this.color3 = "20px solid #ff7900";
  }

  get fileDiplome(): FormArray {
    return this.interForm.get('fileDiplome') as FormArray;
  }
  getDiplomes(e:any) {
    this.fichierDiplome= e.target.files.item(0);
    for (let i = 0; i < this.fileDiplome.length; i++) {
      this.diplomeName = this.fichierDiplome.name;
    }
  }
  getPhoto(e:any) {
    this.photoUpload = e.files.item(0);
    let reader = new FileReader();
    reader.readAsDataURL( this.photoUpload)
    reader.onload= ()=>{
      this.image= reader.result
    } 
  }
  
  getFileContrat(e:any) {
    this.fichierContratUpload = e.target.files.item(0);
    this.contratName = this.fichierContratUpload.name;
  }

  getFileCni(event: any) {
    this.fichierCniUpload = event.target.files[0];
    this.cniName = this.fichierCniUpload.name;
    console.log(this.cniName);
  }

  getFichePoste(event: any) {
    this.fichierPosteUpload = event.target.files[0];
    this.fichedeposteName = this.fichierPosteUpload.name;
    
  }

  getProceVerbal(event: any) {
    this.fichierProceVerbalUpload = event.target.files[0];
    this.proceverbalName = this.fichierProceVerbalUpload.name;
  }

  //les diplomes
  getDiplome1(event: any) {
    this.fichierdiplome1Upload = event.target.files[0];
    
    this.diplomeName1 = this.fichierdiplome1Upload.name;
  }
  getDiplome2(event: any) {
    this.fichierdiplome2Upload = event.target.files[0];
    this.diplomeName2 = this.fichierdiplome2Upload.name;
  }
  getDiplome3(event: any) {
    this.fichierdiplome3Upload = event.target.files[0];
    this.diplomeName3 = this.fichierdiplome3Upload.name;
  }

  submit() {
    this.colorc = "#f16e00";
    this.color3 = "20px solid #f16e00";
    this.lesDiplomeUpload = [
      {
        id: this.idDiplome1,
        diplome: this.fichierdiplome1Upload,
      },
      {
        id: this.idDiplome2,
        diplome: this.fichierdiplome2Upload
      },
      {
        id: this.idDiplome3,
        diplome: this.fichierdiplome3Upload
      },
    ];
    const value = this.interForm.value;
    const info = new FormData();
    info.append("adresse",this.interForm.value.adresse);
    info.append("categorieId",this.interForm.value.categorieId);
    info.append("structureId", this.interForm.value.structureId);
    info.append("domaineId",this.interForm.value.domaineId);
    info.append("societeId","1");
    info.append("universite",this.interForm.value.universite);
    info.append("sexe",this.interForm.value.sexe);
    info.append("profession",this.interForm.value.profession);
    info.append("sitmat",this.interForm.value.sitmat);
    info.append("salaireBrut",this.interForm.value.salaireBrut);
    info.append("dateNaissance",this.interForm.value.dateNaissance);
    info.append("lieuNaissance",this.interForm.value.lieuNaissance);
    info.append("dateDebut",this.interForm.value.dateDebut);
    info.append("dateFin",this.interForm.value.dateFin);
    if(this.dateSignature != undefined) {
      info.append("dateSignature",this.interForm.value.dateSignature);
    }
    info.append("poste",this.interForm.value.poste);
    info.append("typePiece",this.interForm.value.typePiece);
    info.append("numeroPiece",this.interForm.value.numeroPiece);
    info.append("nom",this.interForm.value.nom);
    info.append("prenom",this.interForm.value.prenom);
    info.append("email",this.interForm.value.email);
    info.append("telephone",this.interForm.value.telephone);
    if(this.fichierPosteUpload != undefined) {
      info.append("fileFicheposte",this.fichierPosteUpload);
    }
    if(this.fichierContratUpload != undefined) {
      info.append("contratDoc",this.fichierContratUpload);
    }
    if(this.fichierCniUpload != undefined) {
      info.append("fileCni",this.fichierCniUpload);
    }
    if(this.photoUpload != undefined) {
      info.append("photo",this.photoUpload);
    }
    if(this.fichierProceVerbalUpload != undefined) {
      info.append("fileproceverbal",this.fichierProceVerbalUpload);
    }
    this.otherService.updateInter(info, this.item).subscribe(
      (data) =>{
        if(data){
          this.data = data
          this.successMsg = this.data.status
          if(this.successMsg == true) {
            this.toastr.success(this.data.message, 'Success', {
              timeOut: 3000,
            });
          }
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
    
  
  readUrl1(event: any) {
      if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();
      
        reader.onload = (event: any) => {
          this.url1 = event.target.result;
        }
      
        reader.readAsDataURL(event.target.files[0]);
      }
  }
  
  readUrl2(event: any) {
      if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();
      
        reader.onload = (event: any) => {
          this.url2 = event.target.result;
        }
      
        reader.readAsDataURL(event.target.files[0]);
      }
  }

  readUrl3(event: any) {
      if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();
      
        reader.onload = (event: any) => {
          this.url3 = event.target.result;
        }
      
        reader.readAsDataURL(event.target.files[0]);
      }
  }
  readUrl4(event: any) {
      if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();
      
        reader.onload = (event: any) => {
          this.url4 = event.target.result;
        }
      
        reader.readAsDataURL(event.target.files[0]);
      }
  }
  colors1() {
    let colora = "#ff7900";
    if(localStorage.getItem('colora')){
      colora = localStorage.getItem('colora')
    } 
    return colora;
  }
  colors2() {
    let colorb = "black";
    if(localStorage.getItem('colorb')){
      colorb = localStorage.getItem('colorb')
    } 
    return colorb;
  }
  colors3() {
    let colorb = "black";
    if(localStorage.getItem('colorc')){
      colorb = localStorage.getItem('colorc');
    } 
    return colorb;
  }
  getcolor1() {
    let color = "20px solid #ff7900" 
    if(localStorage.getItem('color1')){
      color = localStorage.getItem('color1');
    } 
    return color;
  }
  getcolor2() {
    let color = "20px solid black" 
    if(localStorage.getItem('color2')){
      color = localStorage.getItem('color2');
    } 
    return color;
  }
  getcolor3() {
    let color = "20px solid black" 
    if(localStorage.getItem('color3')){
      color = localStorage.getItem('color3');
    } 
    return color;
  }

  removeItem() {
    localStorage.removeItem('color1');
    localStorage.removeItem('color2');
    localStorage.removeItem('color3');
    localStorage.removeItem('colora');
    localStorage.removeItem('colorb');
    localStorage.removeItem('colorc');
    this.submited = false;
    this.url1="../assets/images/default.png";
    this.url2="../assets/images/default.png";
    this.url3="../assets/images/default.png";
  }

  openErrorModal(id: string) {
    this.errormodalService.open(id);
  }

  closeErrorModal(id: string) {
    this.errormodalService.close(id);
  }

}