import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OthersService } from 'src/app/services/others.service';
import { ErrormodalService } from 'src/app/modal/_errormodals';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-modifieruser',
  templateUrl: './modifieruser.component.html',
  styleUrls: ['./modifieruser.component.scss']
})
export class ModifieruserComponent implements OnInit {
item;
prenom;
itemsPerPage = 500;
nom;
fonction;
matricule;
profil;
telephone;
dataUser;
photoUpload;
avatar;
dataprofils;
image;
email;
listeFonction;
profilId;
request;
next;
errorMsg
user;
userAgentForm: FormGroup;
  data: any;
  successMsg: any;
  url1;
  public reqUrl = environment.base_url;
  dataAgence: any;
  totalItems: any;
  constructor(private activeroute: ActivatedRoute,
    private route: Router,
    private errormodalService: ErrormodalService,
    private otherService: OthersService,
    private http: HttpClient,
    private toastr: ToastrService) {
      this.activeroute.queryParams.subscribe(params => {
        this.item = JSON.parse(params["user"]);
        this.otherService.detailUser(this.item).subscribe(
          data =>{
            this.dataUser = data;
            this.matricule = this.dataUser.data.matricule;
            this.prenom = this.dataUser.data.prenom;
            this.nom = this.dataUser.data.nom;
            this.email = this.dataUser.data.email;
            this.fonction = this.dataUser.data.fonction;
            this.profil = this.dataUser.data.profil.libelle;
            this.profilId = this.dataUser.data.profil.id;
            this.telephone = this.dataUser.data.telephone;
          })
        })
     }
    ngOnInit() {
      this.user = localStorage.getItem('user');
      this.userAgentForm = new FormGroup({
        matricule: new FormControl(''),
        prenom: new FormControl(''),
        nom: new FormControl(''),
        email: new FormControl(''),
        telephone: new FormControl(''),
        profil: new FormControl(''),
        avatar: new FormControl(''),
        fonction: new FormControl(''),
      })

      //recupere les profils
      this.otherService.getprofil().subscribe(
        data => {
          this.dataprofils = data["data"];
        }
      );
  
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
    modifierUser(){
      const value = this.userAgentForm.value;
      const info = new FormData();
      info.append("prenom",this.userAgentForm.value.prenom);
      info.append("nom",this.userAgentForm.value.nom);
      info.append("fonction", this.userAgentForm.value.fonction);
      info.append("telephone",this.userAgentForm.value.telephone);
      info.append("email",this.userAgentForm.value.email);
      info.append("profilId",this.userAgentForm.value.profil);
      if(this.photoUpload != undefined) {
        info.append("avatar",this.photoUpload);
      }
      this.otherService.updateUser(info, this.item).subscribe(
        (response) =>{
          this.data = response;
          this.successMsg = this.data.status
          if (this.successMsg == true) {
            this.toastr.success(this.data.message, 'Success', {
              timeOut: 3000,
            });
            this.route.navigate(['/accueil/listeuser']);
          }
        }, error=> {
          this.errorMsg = error;
          this.toastr.error(this.errorMsg, 'Echec', {
            timeOut: 5000,
          });
        }
      )
    }

    openErrorModal(id: string) {
      this.errormodalService.open(id);
    }
  
    closeErrorModal(id: string) {
      this.errormodalService.close(id);
    }
  
    getPhoto(e:any) {
      this.photoUpload = e.files.item(0);
      let reader = new FileReader();
      reader.readAsDataURL( this.photoUpload)
      reader.onload= ()=>{
        this.image= reader.result
      } 
    }
}
