import { OthersService } from 'src/app/services/others.service';
import { PaginationService } from './../../service/pagination.service';
import { DataService } from './../../service/data.service';
import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/_modal/modal.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-demande',
  templateUrl: './demande.component.html',
  styleUrls: ['./demande.component.scss']
})
export class DemandeComponent implements OnInit {

 /* demandes: any = [
    {
      id: 1,
      libelle: 'mission', 
    },
    {
      id: 2,
      libelle: 'convenance personnelle', 
    },
    {
      id: 3,
      libelle: 'conge maladie', 
    },
    {
      id: 4,
      libelle: 'conge annuelle', 
    }
  ];*/
  demandes;
  demandeForm: FormGroup;
  currentUser;
  public datas: any;
  // pager object
  //pager: any = {};
  filterterm: string;
  dataDemande;
  pagedItems: any[];
  page = 1;
  itemsPerPage = 5;
  totalItems : any;
  public reqUrl = environment.base_url;
  showHome = true;
  data = [{
    id: 1,
    prenom: "Amadou Dieye",
    nom: "LEYE",
    poste: "Développeur Web",
    dateDebut: "25/12/2020",
    dateFin: "25/12/2022",
    tmp: "tmp_0254",
    agence: "Set Interim",
    dateNais: "10/12/1992",
    lieuNais: "Mbour",
    genre: "masculin",
    cni: "1 619 1992 2154",
    categorie: "Cadre C1C",
    structure: "Sonatel SA",
    direction: "DST",
    pole: "DD",
    departement: "DASI",
    service: "PMA",
    manager: "Madiagne SYLLA",
    postem: "Chef de Services Production et Maintenance Applicatif",
    email: "amadou.dieye.leye@orange-sonatel.com",
    telephone: "+ 221 33 824 91 31",
    adresse: "mbour",
    photo: "inter.png",
    matricule: "060210",
    nomInt: "5"
  }];
  user
  constructor(private dataService: DataService,
    private modalService: ModalService, 
    private router: Router,
    private pagerService: PaginationService, 
    private otherService: OthersService,
    private http: HttpClient
    ) { }

  ngOnInit() {
    this.user = localStorage.getItem('user');
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if(this.user == 'inter') {
      this.showHome = false;
    } else {
      this.showHome = true;
    }
   
     this.otherService.getTypeDemande().subscribe(
     data => {
       this.demandes = data.data;
       console.log(data);
     }
    )
    this.demandeForm = new FormGroup({
      type: new FormControl (''),
      dateDebut: new FormControl(''),
      dateFin: new FormControl (''),
      motif: new FormControl(''),
      description: new FormControl(''),
    });
    this.gty(this.page);
  }

  gty(page: any){
    this.http.get(this.reqUrl + `/lesdemande?page=${page}&limit=${this.itemsPerPage}`).subscribe((data: any) => {
      this.dataDemande =  data.data;
      this.totalItems = data.total;
      console.log(data);
      console.log(this.totalItems);
    })
  
  }
  onSubmit() {
    console.log(this.demandeForm.value);
    this.otherService.addDemande(this.demandeForm.value).subscribe(
      data =>{
        console.log(data);
        this.router.navigate(['accueil/demande'])
        window.location.reload();
      },
      error =>{
        console.log(error);
        
      })
  }

  openModal(id: string) {
    this.modalService.open(id);
    
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }
}
