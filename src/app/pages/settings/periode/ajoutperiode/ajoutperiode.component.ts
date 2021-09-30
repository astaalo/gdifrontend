import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { OthersService } from 'src/app/services/others.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ajoutperiode',
  templateUrl: './ajoutperiode.component.html',
  styleUrls: ['./ajoutperiode.component.scss']
})
export class AjoutperiodeComponent implements OnInit {
  periodeForm: FormGroup;
  currentDate = new Date().getFullYear();
  lastTenYear;
  ListeMois = [
    {
      id: 1,
      libelle: "janvier",
    },
    {
      id: 2,
      libelle: "fevrier"
    },
    {
      id: 3,
      libelle: "mars",
    },
    {
      id: 4,
      libelle: "avril"
    },{
      id: 5,
      libelle: "mai",
    },
    {
      id: 6,
      libelle: "juin",
    },
    {
      id: 7,
      libelle: "juillet",
    },
    {
      id: 8,
      libelle: "aout",
    },
    {
      id: 9,
      libelle: "septembre",
    },
    {
      id: 10,
      libelle: "octobre",
    },
    {
      id: 11,
      libelle: "novembre",
    },
    {
      id: 12,
      libelle: "decembre",
    },
  ];
  data: any;
  dataR;
  successMsg: any;
  toastr: any;
  errorMsg: any;
  constructor(private otherService: OthersService,
              private router: Router) { }

  ngOnInit() {
    this.getTenLastYear();
    this.periodeForm = new FormGroup({
      mois: new FormControl(''),
      annee: new FormControl(''),
    });
  }

  getTenLastYear() {
    this.lastTenYear = [
      {
        annee: this.currentDate
      },{
        annee: this.currentDate - 1
      },{
        annee: this.currentDate - 2
      },{
        annee: this.currentDate - 3
      },{
        annee: this.currentDate - 4
      },{
        annee: this.currentDate - 5
      },{
        annee: this.currentDate - 6
      },{
        annee: this.currentDate - 7
      },{
        annee: this.currentDate - 8
      },{
        annee: this.currentDate - 9
      },
    ];
    return this.lastTenYear
  }
  ajoutPeriode() { 
    this.otherService.addPeriode(this.periodeForm.value).subscribe(
      data =>{
      this.data = data;
     // console.log(data);
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
