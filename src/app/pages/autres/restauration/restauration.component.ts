import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/service/data.service';
import { PaginationService } from 'src/app/service/pagination.service';
import { ModalService } from 'src/app/modal/_modal';
import { ErrormodalService } from 'src/app/modal/_errormodals';
import { environment } from 'src/environments/environment';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { OthersService } from 'src/app/services/others.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-restauration',
  templateUrl: './restauration.component.html',
  styleUrls: ['./restauration.component.scss']
})
export class RestaurationComponent implements OnInit {
  public data; any;
  date = new Date();
  public datas: any;
  isData = false;
  role;
  dataInter: any;
  attestationForm: FormGroup;
  filterForm: FormGroup;
  page = 1;
  itemsPerPage = 10;
  pageAgence = 1;
  itemsPerPageAgence = 100;
  totalItems : any;
  filterterm;
  public reqUrl = environment.base_url;
  result;
  success;
  successMsg;
  ListeMois = [
    {
      id: 1,
      libelle: "janvier",
    },
    {
      id: 2,
      libelle: "fevrier"
    },
    {
      id: 3,
      libelle: "mars",
    },
    {
      id: 4,
      libelle: "avril"
    },{
      id: 5,
      libelle: "mai",
    },
    {
      id: 6,
      libelle: "juin",
    },
    {
      id: 7,
      libelle: "juillet",
    },
    {
      id: 8,
      libelle: "aout",
    },
    {
      id: 9,
      libelle: "septembre",
    },
    {
      id: 10,
      libelle: "octobre",
    },
    {
      id: 11,
      libelle: "novembre",
    },
    {
      id: 12,
      libelle: "decembre",
    },
  ];
  annee: Date;
  yearOnly;
  errorMsg: any;
  dataSociete;
  listeFonction;
  dataDirection;
  dataAgence;
  public matricule = null;
  public poste = null;
  public agence = null;
  public societe = null;
  public direction = null;
  constructor(public datepipe: DatePipe,
    public router: Router,
    private extractionService: AuthService,
    private modalService: ModalService,
    private otherService: OthersService,
    private errormodalService: ErrormodalService,
    private http: HttpClient,
    private toastr: ToastrService
    ) { }

  ngOnInit() {
    this.role = localStorage.getItem('user');
    this.attestationForm = new FormGroup({
      interim_id: new FormControl(''),
      mois: new FormControl('', Validators.required),
      annee: new FormControl('', [
        Validators.required,
        Validators.pattern("[^ @]*@[^ @]*")
      ]),
      contrat_id: new FormControl(''),
      nbr_jr_absence: new FormControl('', Validators.required),
      prenom: new FormControl(''),
      nom: new FormControl(''),
      poste: new FormControl(''),
      matricule: new FormControl(''),
      agence: new FormControl(''),
    });
    this.filterForm = new FormGroup({
      societe: new FormControl(''),
      direction: new FormControl(''),
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

    this.http.get(this.reqUrl + `/listeAgence?page=${this.pageAgence}&limit=${this.itemsPerPageAgence}`).subscribe((data: any) => {
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
      this.matricule = this.filterForm.value.matricule;
      this.agence = this.filterForm.value.agence;
      this.societe = this.filterForm.value.societe;
      this.direction = this.filterForm.value.direction;
    this.otherService.getInterimaireSousContrat(page, this.itemsPerPage, this.matricule, this.poste, this.agence, this.societe, this.direction).subscribe((data: any) => {
      this.dataInter =  data.data;
      this.totalItems = data.total;
    }, error=> {
      this.errorMsg = error;
      this.toastr.error(this.errorMsg, 'Echec', {
        timeOut: 5000,
      });
    })
  }

  submit(interimaire_id) {
    this.yearOnly = this.attestationForm.value.annee.getFullYear();
    let donneeForm = {
      interim_id: interimaire_id,
      mois: this.attestationForm.value.mois,
      annee: this.yearOnly,
      nbr_jr_absence: this.attestationForm.value.nbr_jr_absence,
    }
    this.otherService.addAttestation(donneeForm).subscribe(
      data => {
        this.result = data
        this.successMsg = this.result.status

        if(this.successMsg == true) {
          this.closeModal('custom-modal-'+interimaire_id);
        }
      }, error=> {
        this.errorMsg = error;
        this.toastr.error(this.errorMsg, 'Echec', {
          timeOut: 5000,
        });
      }
    )
  }

  openDetail(data) {
    this.router.navigate(['/accueil/detailinter'], {
      queryParams: {
        user: JSON.stringify(data)
      }
    });
  }

  downloadFile(data: any) {
    const replacer = (key, value) => (value === null ? '' : value); 
    const header = Object.keys(data[0]);
    const csv = data.map((row) =>
      header
        .map((fieldName) => JSON.stringify(row[fieldName], replacer))
        .join(',')
    );
    csv.unshift(header.join(','));
    const csvArray = csv.join('\r\n');
  
    const a = document.createElement('a');
    const blob = new Blob([csvArray], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
  
    a.href = url;
    a.download = 'myFile.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
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
        }
      }
    )
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

  exportCsv(): void {
    if (this.filterForm.value.poste == undefined) {
      this.filterForm.patchValue({poste: ''});
    }
    if(this.filterForm.value.poste) {
      this.poste = this.filterForm.value.poste;
    }
    this.matricule = this.filterForm.value.matricule;
    this.agence = this.filterForm.value.agence;
    this.societe = this.filterForm.value.societe;
    this.direction = this.filterForm.value.direction;
    this.otherService.getInterimaireSousContrat(this.page, this.itemsPerPage, this.matricule, this.poste, this.agence, this.societe, this.direction).subscribe((data: any) => {
      this.dataInter =  data.data;
      this.extractionService.exportToCsv(
        this.dataInter, 
        'ExtractionInterimaireSousContrat' + '-' + this.date.getFullYear() + '-' + this.date.getMonth() + '-' + this.date.getDay() + '-' + this.date.getHours()+ '-' + this.date.getMinutes(),
        ['matricule', 'prenom', 'nom', 'agence', 'poste', 'direction', 'departement', 'service', 'debut_contrat', 'fin_contrat']
      );
      this.totalItems = data.total;
    })
  }
}
