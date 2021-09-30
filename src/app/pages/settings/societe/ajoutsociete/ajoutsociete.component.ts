import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OthersService } from 'src/app/services/others.service';

@Component({
  selector: 'app-ajoutsociete',
  templateUrl: './ajoutsociete.component.html',
  styleUrls: ['./ajoutsociete.component.scss']
})
export class AjoutsocieteComponent implements OnInit {
  societeForm: FormGroup;
  data: any;
  successMsg: any;
  toastr: any;
  errorMsg: any;
  constructor(private otherService: OthersService,
              private router: Router) { }
  ngOnInit() {
    this.societeForm = new FormGroup({
      libelle: new FormControl(''),
    });
  }
  ajouterSocietete() { 
    this.otherService.addSociete(this.societeForm.value).subscribe(
      data =>{
      this.data = data;
      console.log(data);
        this.successMsg = this.data.status
        if(this.successMsg == true) {
          this.toastr.success(this.data.message, 'Success', {
            timeOut: 3000,
          });
          this.router.navigate(['/accueil/listsociete'])
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

  rechercherInterimaire() {}
}
