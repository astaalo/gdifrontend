import { OthersService } from './../../../../services/others.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ajoutstructure',
  templateUrl: './ajoutstructure.component.html',
  styleUrls: ['./ajoutstructure.component.scss']
})
export class AjoutstructureComponent implements OnInit {
  structureForm: FormGroup;
  dataDirection;
  dataDepartement;
  donneeService;
  data: any;
  successMsg: any;
  toastr: any;
  errorMsg: any;
  constructor(private otherService: OthersService,
              private router: Router) { }

  ngOnInit() {
    
    this.structureForm = new FormGroup({
      libelle: new FormControl(''),
      directionId: new FormControl(''),
      service: new FormControl(''),
      typeStructureId: new FormControl(''),
      bu: new FormControl(''),
      pole: new FormControl(''),
    });
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
      
    ajouterSocietete() { 
      this.otherService.addSociete(this.structureForm.value).subscribe(
        data =>{
        this.data = data;
        console.log(data);
          this.successMsg = this.data.status
          if(this.successMsg == true) {
            this.toastr.success(this.data.message, 'Success', {
              timeOut: 3000,
            });
            this.router.navigate(['/accueil/liststucture'])
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
