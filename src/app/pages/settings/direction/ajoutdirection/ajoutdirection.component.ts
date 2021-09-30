import { OthersService } from 'src/app/services/others.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ajoutdirection',
  templateUrl: './ajoutdirection.component.html',
  styleUrls: ['./ajoutdirection.component.scss']
})
export class AjoutdirectionComponent implements OnInit {
  directionForm: FormGroup;
  dataSociete;
  constructor(private otherService: OthersService) { }

  ngOnInit() {
    this.directionForm = new FormGroup({
      libelle: new FormControl(''),
      societeId: new FormControl(''),
    });
    this.otherService.getAllSociete().subscribe(
      data => {
        this.dataSociete = data["data"];
      }
    );
  }
  ajouterDirection(){
    
  }

  ajouterDirection() {}

}
