import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxFileSaverService } from '@clemox/ngx-file-saver';
import { DataService } from 'src/app/service/data.service';
import { OthersService } from 'src/app/services/others.service';
import { ModalService } from 'src/app/modal/_modal/modal.service';
import { ErrormodalService } from 'src/app/modal/_errormodals';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-detailagence',
  templateUrl: './detailagence.component.html',
  styleUrls: ['./detailagence.component.scss']
})
export class DetailagenceComponent implements OnInit {

  item: any;
  url1;
  url3: any;
  user;
  showupdate;
  showadduser;
  showdelete;
  id: any;
  image: any;
  dataAgence;
  agenceForm: FormGroup;
  userAgenceForm: FormGroup;
  nomUpdate; 
  url2;
  urlUser;
  viewer = 'google';
  contratDoc="";
  DemoDoc1="https://file-examples.com/wp-content/uploads/2017/02/file-sample_100kB.doc";
  DemoDoc2="https://www.le.ac.uk/oerresources/bdra/html/resources/example.txt"; 
  contratName;
  cnidgName;
  fichierCnidg?: File;
  fichierContrat?: File;
  userAgentForm: FormGroup;
  data;
  nom;
  responsable;
  numDg;
  nomdg;
  email;
  telephone;
  fixe;
  site;
  adresse;
  mobile;
  logo;
  contrat;
  cnidg;
  userAgence;
  dataTotalAgence;
  total;
  actifs;
  inactifs;
  dataSociete;
  dataStructure;
  dataprofils;
  listeFonction
  fichierPhoto?: File;
  prenom;
  page = 1;
  itemsPerPage = 8;
  totalItems : any;
  imageName;
  public reqUrl = environment.base_url;
  errorMsg: any;
  dataMatriculeInter: any;
  successMsg: any;
  constructor(private activeroute: ActivatedRoute,
    private modalService: ModalService,
    private toastr: ToastrService,
    private http: HttpClient,
    private fileSaver: NgxFileSaverService,
    private otherService: OthersService,
    private errormodalService: ErrormodalService,
    private route: Router) { 
      this.activeroute.queryParams.subscribe(params => {
        this.item = JSON.parse(params["agence"]);
        this.otherService.getOneAgenceById(this.item).subscribe(
          data =>{
            this.data = data;
            this.dataAgence = this.data.data;
            this.nom = this.dataAgence.nom;
            this.responsable  = this.dataAgence.responsable;
            this.numDg = this.dataAgence.numDg;
          //  this.nomdg = this.dataAgence.nomdg;
            this.email = this.dataAgence.email;
            this.telephone = this.dataAgence.telephone;
            this.contratDoc = this.dataAgence.contrat;
            this.site = this.dataAgence.site;
            this.adresse = this.dataAgence.adresse;
            this.logo = this.dataAgence.logo;
            this.contrat = this.dataAgence.contrat;
          //  this.cnidg = this.dataAgence.data.cnidg;
            this.userAgence = this.dataAgence['user'];
            
          }
        );
      })

      this.otherService.getTotalAgenceActifInactif(this.item).subscribe(
        data =>{
          this.data = data;
          this.dataTotalAgence = this.data;
          this.total = this.dataTotalAgence.total;
          this.actifs = this.dataTotalAgence.actifs;
          this.inactifs = this.dataTotalAgence.inactifs;
        });
    }

  ngOnInit() {
    this.user = localStorage.getItem('user');
    if(this.user == 'AGN' || this.user == 'DRH') {
      this.showupdate = true;
    } else {
      this.showupdate = false;
    }
    this.agenceForm = new FormGroup({
      nom: new FormControl(''),
      responsable: new FormControl(''),
      nomdg: new FormControl(''),
      numDg: new FormControl(''),
      email: new FormControl(''),
      telephone: new FormControl(''),
      mobile: new FormControl(''),
      site: new FormControl(''),
      adresse: new FormControl(''),
      logo: new FormControl(''),
      contrat: new FormControl(''),
      cnidg: new FormControl(''),
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
  
    //recupere les societes
    this.otherService.getAllSociete().subscribe(
      data => {
        this.dataSociete = data["data"];
      }
    );

    this.otherService.getAllStructure().subscribe(data => {
      this.dataStructure = data['data'];
    })

      //recupere les profils
    this.otherService.getprofil().subscribe(
      data => {
        this.dataprofils = data["data"];
      }
    );
    this.gty(this.page);

    this.otherService.getFonctions().subscribe(data => this.listeFonction = data.data);
  }

  gty(page: any){
    this.http.get(this.reqUrl + `/listeAgence?page=${page}&limit=${this.itemsPerPage}`).subscribe((data: any) => {
      this.dataAgence =  data.data;
      this.totalItems = data.total;
    })
  }

  public saveFonction(e): void {
    let libelle = e.target.value;
    let list = this.listeFonction.filter(x => x.libelle === libelle)[0];
    this.userAgentForm.patchValue({fonction: list.libelle});
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
          this.toastr.success('L\'utilisateur a été ajouté', 'Sucess', {
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

  submitted1() {
    const value = this.agenceForm.value;
    const info = new FormData();
    info.append("nom",value.nom);
    info.append("nomdg",value.responsable);
    info.append("numdg",value.numDg);
    info.append("email",value.email);
    info.append("mobile",value.mobile);
    info.append("fixe",value.telephone);
    info.append("site",value.site);
    info.append("adresse",value.adresse);
    info.append("logo",this.logo);
    info.append("cnidg",this.fichierCnidg);
    info.append("contrat",this.fichierContrat);
    this.otherService.updateAgence(info, this.item).subscribe(
      (res) =>{
        console.log(res);
        if(res){
          this.route.navigate(['/accueil/listagence']);
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

    //recuperation de l'image
 getPhoto(e:any) {
    this.logo= e.files.item(0);
    let reader = new FileReader();
    reader.readAsDataURL(this.logo)
    reader.onload= ()=>{
      this.image= reader.result
    } 
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
 
   //recuperation du  contrat
   getFileContrat(event: any) {
    this.fichierContrat = event.target.files[0];
    this.contratName = this.fichierContrat.name;
  }
   //recuperation  du cnidg
   getCnidg(e:any) {
    this.fichierCnidg= e.files.item(0);
    this.cnidgName = this.fichierCnidg.name;
  }

  public getfilemodal() {
    this.fileSaver.saveUrl(this.contratDoc, 'contrat');
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  openDetail(data) {
    this.route.navigate(['/accueil/detailuser'], {
      queryParams: {
        user: JSON.stringify(data)
      }
    })
  }

  delete() {
    this.otherService.deleteAgence(this.item).subscribe(
      (response) => {
       if (response) {
        this.route.navigate(['/accueil/listagence']);
       }
      },
      error => {
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
