import { ToastrService } from 'ngx-toastr';
import { DataService } from '../../../service/data.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OthersService } from '../../../services/others.service';
import { from } from 'rxjs';
import { Router } from '@angular/router';
import { ErrormodalService } from 'src/app/modal/_errormodals';

@Component({
  selector: 'app-addagence',
  templateUrl: './addagence.component.html',
  styleUrls: ['./addagence.component.scss']
})
export class AddagenceComponent implements OnInit {

  url1="assets/images/default.png";
  url2;
  url3;
  url4;
  url5;
  ninea;
  rccm;
  contrat;
  cnidg;
  logo : any;
  image: any;
  datas: any;
  errorMsg: string;
  infoForm: FormGroup;
  filename1 = "";
  filename2 = "";
  filename3 = "";
  filename4 = "";
  filename5 = "";
  filenameUser = "";
  data;
  successMsg;
  constructor(
              private route: Router,
              private toastr: ToastrService,
              private errormodalService: ErrormodalService,
              private otherService: OthersService ) { }

  
  ngOnInit() {
    this.infoForm = new FormGroup({
      nom: new FormControl ('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]')
      ]),
      nomdg: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z]')
      ]),
      numdg: new FormControl ('', Validators.required,),
      email: new FormControl('', Validators.required,),
      mobile: new FormControl ('', Validators.required,),
      fixe: new FormControl(''),
      siteweb: new FormControl (''),
      adresse: new FormControl(''),
      logo: new FormControl ('', Validators.required,),
      ninea: new FormControl('', Validators.required,),
      rccm: new FormControl ('', Validators.required,),
      cnidg: new FormControl('', Validators.required,),
      contrat: new FormControl ('', Validators.required,),
    });
  }

  readUrl(event: any) {
      if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();
      
        reader.onload = (event: any) => {
          this.url1 = event.target.result;
        }
      
        reader.readAsDataURL(event.target.files[0]);
      }
  }
  readUrl1(event: any) {
      if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();
      
        reader.onload = (event: any) => {
          this.url3 = event.target.result;
        }
        this.filename1 = event.target.files[0].name;
        reader.readAsDataURL(event.target.files[0]);
      }
  }
  getCnidg(e: any) {
    this.cnidg= e.files.item(0);
    this.filename5 = this.cnidg.name;
  }
  getContrat(e: any) {
    this.contrat= e.files.item(0);
    this.filename4 = this.contrat.name;
  }
  getNinea(e: any) {
    this.ninea= e.files.item(0);
    this.filename2 = this.ninea.name;
  }
  getRccm(e: any) {
    this.rccm= e.files.item(0);
    this.filename3 = this.rccm.name;
  }

  submitted1() {
    const value = this.infoForm.value;
    const info = new FormData();
    info.append("nom",value.nom);
    info.append("nomdg",value.nomdg);
    info.append("numdg",value.numdg);
    info.append("email",value.email);
    info.append("mobile",value.mobile);
    info.append("fixe",value.fixe);
    info.append("siteweb",value.siteweb);
    info.append("adresse",value.adresse);
    info.append("logo",this.logo);
    info.append("ninea",this.ninea);
    info.append("cnidg",this.cnidg);
    info.append("rccm",this.rccm);
    info.append("contrat",this.contrat);
   this.otherService.addAgence(info).subscribe(
      data => {
        this.data = data;
        this.successMsg = this.data.status;
        if (this.successMsg == true) {
          this.toastr.success('L\'agence a été ajouté', 'Success', {
            timeOut: 3000,
          });
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

  getLogo(e:any) {
    this.logo= e.files.item(0);

    let reader = new FileReader();
    reader.readAsDataURL( this.logo)
    reader.onload= ()=>{
      this.image= reader.result
    }
  }
  openErrorModal(id: string) {
    this.errormodalService.open(id);
  }

  closeErrorModal(id: string) {
    this.errormodalService.close(id);
  }
}
