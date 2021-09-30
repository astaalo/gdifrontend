import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { OthersService } from 'src/app/services/others.service';
import { ModalService } from 'src/app/modal/_modal';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrormodalService } from 'src/app/modal/_errormodals';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-listehistoriquecontrat',
  templateUrl: './listehistoriquecontrat.component.html',
  styleUrls: ['./listehistoriquecontrat.component.scss']
})
export class ListehistoriquecontratComponent implements OnInit {

  
  role;
  commentaire;
  objectif;
  item;
  id;
  histoContrat;
  data;
  interimaire;
  prenom;
  note;
  nom;
  isData = true;
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
  errorMsg: any;
  dataInter;
  constructor(private otherService: OthersService,
    private modalService: ModalService,
    private activeroute: ActivatedRoute,
    private errormodalService: ErrormodalService,
    private http: HttpClient,
    private router: Router,) {
    this.activeroute.queryParams.subscribe(params => {
      this.item = JSON.parse(params["interimaire"]);
    });
  }

  ngOnInit() {
    this.role = localStorage.getItem('user');
    this.otherService.getOneInterById(this.item).subscribe(
      data =>{
        this.data = data;
        this.dataInter = this.data.data;
        this.nom = this.dataInter.nom;
        this.prenom = this.dataInter.prenom;
    }
  );
    this.gty(this.page);
  }

  gty(page: any){
    this.http.get(this.reqUrl + `/histoContratInterimaire/${this.item}?page=${page}&limit=${this.itemsPerPage}`).subscribe((data: any) => {
      this.data = data ;
      this.totalItems = data.total;
      this.histoContrat = this.data.data["contrats"];
      if(this.data.code == 500) {
        this.isData = false;
      }
    })
  }

  openDetail(data) {
    this.router.navigate(['/accueil/detailcontrat'], {
      queryParams: {
        contrat: JSON.stringify(data),
        interimaire: JSON.stringify(this.item)
      }
    })
  }

  openModal(id: string) {
    this.modalService.open(id);
  }
  
  closeModal(id: string) {
    this.modalService.close(id);
  }

  openErrorModal(id: string) {
    this.errormodalService.open(id);
  }

  closeErrorModal(id: string) {
    this.errormodalService.close(id);
  }

}
