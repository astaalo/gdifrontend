import { ToastrService } from 'ngx-toastr';
import { OthersService } from '../../../services/others.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxFileSaverService } from '@clemox/ngx-file-saver';
import { DataService } from 'src/app/service/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalService } from 'src/app/modal/_modal';
import { ErrormodalService } from 'src/app/modal/_errormodals';

@Component({
  selector: 'app-agence',
  templateUrl: './agence.component.html',
  styleUrls: ['./agence.component.scss']
})
export class AgenceComponent implements OnInit {

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
  userAgentForm: FormGroup;
  dataTotalAgence;
  total;
  actifs;
  cnidg;
  inactifs;
  fichierPhoto;
  successMsg;
  viewer = 'google'; 
  errorMsg: any;
  imageName: any;
  image: string | ArrayBuffer;
  dataprofils: any;
  listeFonction: any;

  constructor(private fileSaver: NgxFileSaverService,
    private modalService: ModalService,
    private errormodalService: ErrormodalService,
    private route: Router,
    private toastr: ToastrService,
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

    this.userAgentForm = new FormGroup({
      prenomUser: new FormControl('', Validators.required,),
      nomUser: new FormControl('', Validators.required,),
      emailUser: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ]),
      telephoneUser: new FormControl('', Validators.required,),
      fonction: new FormControl('', Validators.required,),
      login: new FormControl(''),
      profil: new FormControl(''),
      avatarUser: new FormControl(''),
      agenceId: new FormControl(''),
    })
    this.item = JSON.parse(localStorage.getItem('currentUser'));
    this.user = localStorage.getItem('user');
    if(this.user == 'AGN') {
      this.showupdate = true;
    } else {
      this.showupdate = false;
    }
    if(this.user == 'INT') {
      this.showHome = false;
    } else {
      this.showHome = true;
    }
    this.otherService.getOneAgenceById(this.item.data.agence).subscribe(
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
        this.numerodg = this.dataAgence.data.numdg;
        this.userAgence = this.dataAgence.data['user'];
        
      }
    );
    this.otherService.getTotalAgenceActifInactif(this.item.data.agence).subscribe(
      data =>{
        this.data = data;
        this.dataTotalAgence = this.data;
        this.total = this.dataTotalAgence.total;
        this.actifs = this.dataTotalAgence.actifs;
        this.inactifs = this.dataTotalAgence.inactifs;
      }
    );

    this.otherService.getContratById(this.id).subscribe(
      data =>{
        this.data = data;
        this.dataContrat = this.data.data;
      }
    )
    
    this.otherService.getprofil().subscribe(
      data => {
        this.dataprofils = data["data"];
      }
    );
   
    this.otherService.getFonctions().subscribe(data => this.listeFonction = data.data);
  
  }

  public saveFonction(e): void {
    let libelle = e.target.value;
    let list = this.listeFonction.filter(x => x.libelle === libelle)[0];
    this.userAgentForm.patchValue({fonction: list.libelle});
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

  //ajout user

  ajouterUser() {
    const formdata = new FormData(); 
    formdata.append("prenom",this.userAgentForm.value.prenomUser);
    formdata.append("nom",this.userAgentForm.value.nomUser);
    formdata.append("profil",this.userAgentForm.value.profil);
    formdata.append("fonction",this.userAgentForm.value.fonction);
    formdata.append("agenceId",this.item);
    formdata.append("email",this.userAgentForm.value.emailUser);
    formdata.append("telephone",this.userAgentForm.value.telephoneUser);
    formdata.append("avatar",this.fichierPhoto);
    this.otherService.addUser(formdata).subscribe(
      (response) =>{
        this.data = response;
        this.successMsg = this.data.status
        if(this.successMsg == true) {
          this.toastr.success('L\'utilisateur a été ajouté', 'Success', {
            timeOut: 3000,
          });
          this.route.navigate(['/accueil/listeuser']);
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

  public getContrat() {
    this.fileSaver.saveUrl(this.contratDoc, 'contrat');
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  //recuperer image pour add user
  getphoto(event: any) {
    this.fichierPhoto = event.target.files[0];
    this.imageName = this.fichierPhoto.name;
    let reader = new FileReader();
    reader.readAsDataURL( this.fichierPhoto);
    reader.onload= ()=>{
      this.image= reader.result;
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

  delete(id) {
  }
  openErrorModal(id: string) {
    this.errormodalService.open(id);
  }

  closeErrorModal(id: string) {
    this.errormodalService.close(id);
  }
}
