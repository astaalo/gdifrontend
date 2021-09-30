import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { OthersService } from 'src/app/services/others.service';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})
export class AsideComponent implements OnInit {

  public data; any; 
  currentUser;
  prenom; 
  nom;
  poste;
  photo;
  dataInterFin;
  nouveauxRrecrus;
  pmc;
  managerinfo;
  color: any;
  user: any;
  showHome = true;
  present;
  malade;
  conge;
  constructor(private dataService: DataService,private otherService: OthersService) {
    this.otherService.getInter().subscribe(
      data => {
        console.log(data);
        this.dataInterFin = data.data;
      }
    );

    
    this.otherService.getNouveauRecrus().subscribe(
      data => {
       this.nouveauxRrecrus = data.data;
       console.log(data);
      }
    );

    this.otherService.getStatPresence().subscribe(
      data => {
        this.pmc = data.data;
        console.log(data);
        this.present = this.pmc.present;
        this.malade = this.pmc.malade;
        this.conge = this.pmc.conge;
      }
    );
  }

  ngOnInit() {
    this.user = localStorage.getItem('user');
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if(this.user == 'INT') {
      this.showHome = false;
    } else {
      this.showHome = true;
    }
    this.data = this .dataService.getData();
    
    if(this.user == 'INT') {
      this.otherService.getDetailsManagerById(this.currentUser.manager.id).subscribe( 
        result => {
          console.log(result);
          this.data = result;
          this.managerinfo = this.data.data.detail
          this.prenom = this.managerinfo.prenom;
          this.nom = this.managerinfo.nom;
          this.poste = this.managerinfo.fonction;
          this.photo = this.managerinfo.avatar;
        }
      )
    }
  }

  getColor(p) {
    if(p.isAdmissible == true) {
      this.color = "#6dd400";
    } else if (p.isAdmissible == false) {
      this.color = "#f03737";
    }
    return this.color;
  }
}
