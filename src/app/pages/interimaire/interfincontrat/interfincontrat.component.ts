import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import { PaginationService } from 'src/app/service/pagination.service';
import { OthersService } from 'src/app/services/others.service';
import { ModalService } from 'src/app/modal/_modal';
import { environment } from 'src/environments/environment';
import { ErrormodalService } from 'src/app/modal/_errormodals';

@Component({
  selector: 'app-interfincontrat',
  templateUrl: './interfincontrat.component.html',
  styleUrls: ['./interfincontrat.component.scss']
})
export class InterfincontratComponent implements OnInit {

  public datas: any;
  pager: any = {};
  id;
  filterterm: string;
  public p: any;
  pagedItems: any[];
  date: any;
  dateFin;
  user;
  showupdate;
  dataFinContrat;
  mois: any = [
    'Janvier', 
    'Février', 
    'Mars', 
    'Avril',
    'Mai',
    'Juin',
    'Juillet', 
    'Aout', 
    'Septembre', 
    'Octobre',
    'Novembre',
    'Décembre',
  ];
  sommes: any = [
    '20.000f', 
    '30.000f', 
    '40.000f', 
    '50.000f',
    '60.000f',
    '70.000f',
    '80.000f', 
  ];
  scrHeight:any;
  scrWidth:any;
  errorMsg: any;
  dataSociete: any;
  dataAgence: any;
  listeFonction: any;
  itemsPerPageAgence: 100;
  pageAgence: 1;
  dataDirection: any;
  data: any;
  successMsg: any;
  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
        this.scrHeight = window.innerHeight;
        this.scrWidth = window.innerWidth;
        console.log(this.scrHeight, this.scrWidth);
  }
  filterForm: FormGroup;
  moisSelect
  demandeForm: FormGroup;
  page = 1;
  itemsPerPage = 10;
  public matricule = null;
  public poste = null;
  public agence = null;
  public societe = null;
  public direction = null;
  totalItems : any;
  public reqUrl = environment.base_url;
  constructor(private modalService: ModalService,
    private otherService: OthersService,
    public datepipe: DatePipe,
    private errormodalService: ErrormodalService,
    public router: Router,
    private http: HttpClient,
    private toastr:ToastrService
    ) {  
      this.getScreenSize();
    }

  ngOnInit() {
    this.user = localStorage.getItem('user');
    if(this.user == 'drh') {
      this.showupdate = true;
    } else {
      this.showupdate = false;
    }

    this.demandeForm = new FormGroup({
      moi: new FormControl (''),
      somme: new FormControl('')
    });
    
    this.filterForm = new FormGroup({
      direction: new FormControl(''),
      societe: new FormControl(''),
      agence: new FormControl(''),
      poste: new FormControl(''),
      matricule: new FormControl(''),
    });

    this.gty(this.page);

    this.otherService.getAllSociete().subscribe(
      data => {
        this.dataSociete = data["data"];
      }
    );

    this.otherService.getFonctions().subscribe(data => this.listeFonction = data.data);

    this.http.get(this.reqUrl + `/listeAgence?page=1&limit=100`).subscribe((data: any) => {
      this.dataAgence =  data.data;
    })
  }

  public saveProfession(e): void {
    let libelle = e.target.value;
    let list = this.listeFonction.filter(x => x.libelle === libelle)[0];
    this.filterForm.patchValue({poste: list.libelle});
  }

  directionsListe(value) {
    this.otherService.getAllDirection(value).subscribe(
      data => {
        this.dataDirection = data['data'];
       }
    ); 
  }

  gty(page: any){
    if (this.filterForm.value.poste == undefined) {
      this.filterForm.patchValue({poste: ''});
    }
    if(this.filterForm.value.poste) {
      this.poste = this.filterForm.value.poste;
    }
    if(this.filterForm.value.matricule) {
      this.matricule = this.filterForm.value.matricule;
    }
    if(this.filterForm.value.agence) {
      this.agence = this.filterForm.value.agence;
    }
    if(this.filterForm.value.societe) {
      this.societe = this.filterForm.value.societe;
    }
    if(this.filterForm.value.direction) {
      this.direction = this.filterForm.value.direction;
    }
    this.otherService.getInterimaireFinContrat(page, this.itemsPerPage, this.matricule, this.poste, this.agence, this.societe, this.direction).subscribe((data: any) => {
      this.dataFinContrat =  data.data;
      this.totalItems = data.total;
    })
  }
  openDetail(data) {
    this.router.navigate(['/accueil/detailinter'], {
      queryParams: {
        user: JSON.stringify(data)
      }
    })
  }

  extraireInter() {
    if (this.filterForm.value.poste == undefined) {
      this.filterForm.patchValue({poste: ''});
    }
    this.otherService.extraireInterimaire(this.filterForm.value).subscribe(
      data => {
        this.data = data;
        this.successMsg = this.data.status
        if(this.successMsg == true) {
          window.open(data.data);
          this.toastr.success(this.data.message, 'Success', {
            timeOut: 3000,
          });
        }
      }, error=> {
        this.errorMsg = error;
        this.toastr.error(this.errorMsg, 'Echec', {
          timeOut: 5000,
        });
      }
    )
  }

 

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  getcolor1(p) {
    let color = "#10a900"
  
    if(p.admissible==false) {
      color = "#ff0000"
    } else {
      color = "#10a900"
    }  
    return color; 
  } 

  openErrorModal(id: string) {
    this.errormodalService.open(id);
  }

  closeErrorModal(id: string) {
    this.errormodalService.close(id);
  }
}
