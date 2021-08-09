import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { OthersService } from 'src/app/services/others.service';
import { ModalService } from 'src/app/_modal';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrormodalService } from 'src/app/_errormodals';
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
  errorMsg: any;
  constructor(private otherService: OthersService,
    private modalService: ModalService,
    private activeroute: ActivatedRoute,
    private errormodalService: ErrormodalService,
    private http: HttpClient,
    private router: Router,) {
    this.activeroute.queryParams.subscribe(params => {
      this.item = JSON.parse(params["interimaire"]);
      console.log(this.item);
    });
  }

  ngOnInit() {
    this.role = localStorage.getItem('user');
    // this.interimConnect = JSON.parse(localStorage.getItem('currentUser'));
    // this.item = this.interimConnect.interimaire.id
    // console.log(this.interimConnect);
    
    
    this.gty(this.page);
  }

  gty(page: any){
    this.http.get(this.reqUrl + `/histoContratInterimaire/id/societe/id/${this.item}?page=${page}&limit=${this.itemsPerPage}`).subscribe((data: any) => {
      this.data = data ;
      this.histoContrat = this.data["data"];
      console.log(data);
    }, error=> {
      this.errorMsg = error;
      this.errormodalService.open('error-modal-1');
      console.log(error)
    })
  }

  openDetail(data) {
    this.router.navigate(['/accueil/detailcontrat'], {
      queryParams: {
        user: JSON.stringify(data)
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
