import { Router } from '@angular/router';
import { OthersService } from './../../../../services/others.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ajoutprofil',
  templateUrl: './ajoutprofil.component.html',
  styleUrls: ['./ajoutprofil.component.scss']
})
export class AjoutprofilComponent implements OnInit {
  profilForm: FormGroup;
  libelle;
  code;
  description;
  emptyLib = false;
  data: any;
  successMsg: any;
  toastr: any;
  errorMsg: any;
  constructor(private otherService: OthersService,
              private router: Router) { }

  ngOnInit() {
    this.profilForm = new FormGroup({
      libelle: new FormControl(''),
      code: new FormControl(''),
      description: new FormControl(''),
    });
  }

  ajouterProfil() { 
    this.otherService.addProfil(this.profilForm.value).subscribe(
      data =>{
      this.data = data;
        this.successMsg = this.data.status
        if(this.successMsg == true) {
          this.toastr.success(this.data.message, 'Success', {
            timeOut: 3000,
          });
          this.router.navigate(['/accueil/listprofil'])
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

