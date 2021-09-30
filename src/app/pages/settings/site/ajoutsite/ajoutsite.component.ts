import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { OthersService } from 'src/app/services/others.service';

@Component({
  selector: 'app-ajoutsite',
  templateUrl: './ajoutsite.component.html',
  styleUrls: ['./ajoutsite.component.scss']
})
export class AjoutsiteComponent implements OnInit {

  siteForm: FormGroup;
  libelle;
  code;
  adresse;
  emptyLib = false;
  data: any;
  dataR;
  successMsg: any;
  toastr: any;
  errorMsg: any;
  constructor(private otherService: OthersService,
              private router: Router) { }

  ngOnInit() {
    this.siteForm = new FormGroup({
      libelle: new FormControl(''),
      code: new FormControl(''),
      adresse: new FormControl(''),
      regionId: new FormControl(''),
    });
    this.otherService.listeRegions().subscribe(
      data => {
        this.dataR = data["data"];
      }
    );
  }

  ajouterSite() { 
    this.otherService.addSite(this.siteForm.value).subscribe(
      data =>{
      this.data = data;
      console.log(data);
      
        this.successMsg = this.data.status
        if(this.successMsg == true) {
          this.toastr.success(this.data.message, 'Success', {
            timeOut: 3000,
          });
          this.router.navigate(['/accueil/listsite'])
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
}
