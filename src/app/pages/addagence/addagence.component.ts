import { DataService } from './../../service/data.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { OthersService } from '../../services/others.service';
import { from } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addagence',
  templateUrl: './addagence.component.html',
  styleUrls: ['./addagence.component.scss']
})
export class AddagenceComponent implements OnInit {

  url1="../assets/images/default.png";
  url2;
  url3;
  url4;
  logo : any;
  image: any;
  datas: any;
  errorMsg: string;
  infoForm: FormGroup;
  constructor(private dataService: DataService,
              private route: Router,
              private otherService: OthersService ) { }

  
  ngOnInit() {
  //  this.datas = this.dataService.getData();
    this.infoForm = new FormGroup({
      nom: new FormControl (''),
      nomdg: new FormControl(''),
      numdg: new FormControl (''),
      email: new FormControl(''),
      mobile: new FormControl (''),
      fixe: new FormControl(''),
      siteweb: new FormControl (''),
      adresse: new FormControl(''),
      logo: new FormControl (''),
     // login: new FormControl(''),
     // password: new FormControl (''),
     // ninea: new FormControl(''),
      //rccm: new FormControl (''),
      //cnidg: new FormControl(''),
      //contrat: new FormControl (''),
    });
  }

  readUrl(event: any) {
    console.log('readUrl');
      if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();
      
        reader.onload = (event: any) => {
          this.url1 = event.target.result;
        }
      
        reader.readAsDataURL(event.target.files[0]);
      }
  }
  readUrl1(event: any) {
    console.log('readUrl');
      if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();
      
        reader.onload = (event: any) => {
          this.url3 = event.target.result;
        }
      
        reader.readAsDataURL(event.target.files[0]);
      }
  }
  submitted1() {
    console.log(this.infoForm.value);
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
    this.otherService.addAgence(info).subscribe(
      data => {
        console.log(data);
        if (data) {
          alert('Agence ajouté avec succées...');
        }
        this.route.navigate(['/accueil/listagence']);
      },
        error=> {
          this.errorMsg = 'Probleme de connexion au serveur';
          console.log(error)
        }
        //this.ndm.navigateByUrl('/accueil/listUsers');
      )
  }

  //recuperation de l'avatar
  getLogo(e:any) {
    this.logo= e.files.item(0);
    console.log(this.logo)

    let reader = new FileReader();
    reader.readAsDataURL( this.logo)
    reader.onload= ()=>{
      this.image= reader.result
      console.log(this.image)
    }
  }
}
