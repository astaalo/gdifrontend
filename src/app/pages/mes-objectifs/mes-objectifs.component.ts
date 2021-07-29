import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { OthersService } from 'src/app/services/others.service';
import { ModalService } from 'src/app/_modal';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-mes-objectifs',
  templateUrl: './mes-objectifs.component.html',
  styleUrls: ['./mes-objectifs.component.scss']
})
export class MesObjectifsComponent implements OnInit {

  
  role;
  commentaire;
  objectif;
  item;
  data;
  interimaire;
  prenon;
  prenom;
  note;
  nom;
  successMsg;
  objectifForm: FormGroup;
  noteForm: FormGroup;
  modifierForm: FormGroup;
  titremodif;
  descriptionmodif;
  page = 1;
  itemsPerPage = 4;
  totalItems : any;
  interimConnect;
  public reqUrl = environment.base_url;
  constructor(private otherService: OthersService,
    private modalService: ModalService,
    private http: HttpClient,) {
  }

  ngOnInit() {
    this.role = localStorage.getItem('user');
    this.interimConnect = JSON.parse(localStorage.getItem('currentUser'));
    this.item = this.interimConnect.interimaire.id
    console.log(this.interimConnect);
    this.otherService.getListeObjectif(this.item).subscribe(
      data => {
        this.data = data
        this.objectif = this.data["data"];
        console.log(data);
      }
    );
    this.gty(this.page);
  }

  gty(page: any){
    this.http.get(this.reqUrl + `/listeObjectifs/${this.item}?page=${page}&limit=${this.itemsPerPage}`).subscribe((data: any) => {
      this.data = data
      this.objectif = this.data["data"];
      console.log(data);
    })
  }
}
