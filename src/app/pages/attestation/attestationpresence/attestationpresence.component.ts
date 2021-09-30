import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { OthersService } from 'src/app/services/others.service';
import { environment } from 'src/environments/environment';
import { ErrormodalService } from 'src/app/modal/_errormodals';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-attestationpresence',
  templateUrl: './attestationpresence.component.html',
  styleUrls: ['./attestationpresence.component.scss']
})
export class AttestationpresenceComponent implements OnInit {

  p = 1;
  date = new Date();
  checkedList:any;
  selectedAll: any;
  filterForm: FormGroup;
  result;
  data: any;
  successMsg;
  filterterm: string;
  dataAttest: any;
  page = 1;
  itemsPerPage = 5;
  totalItems : any;
  user;
  public reqUrl = environment.base_url;
  errorMsg: any;
  public annee = null;
  public mois = null;
  public reference = null;
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
  currentDate = new Date().getFullYear();
  lastTenYear: { annee: any; }[];
  constructor(private extractionService: AuthService,
              private http: HttpClient,
              private errormodalService: ErrormodalService,
              private otherService: OthersService,
              private router: Router,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.lastTenYear = [
      {
        annee: this.currentDate
      },{
        annee: this.currentDate - 1
      },{
        annee: this.currentDate - 2
      },{
        annee: this.currentDate - 3
      },{
        annee: this.currentDate - 4
      }
    ];
    this.user = localStorage.getItem('user');
    this.filterForm = new FormGroup({
      mois: new FormControl(''),
      annee: new FormControl('') ,
      reference: new FormControl('')
    });
    this.gty(this.page);
  }

  gty(page: any){
    if(this.filterForm.value.mois) {
      this.mois = this.filterForm.value.mois;
    }
    if(this.filterForm.value.reference) {
      this.reference = this.filterForm.value.reference;
    }
    if(this.filterForm.value.annee) {
      this.annee = this.filterForm.value.annee; 
    }
    this.otherService.listAttestationFilter(page,this.itemsPerPage, this.mois, this.annee, this.reference).subscribe(
      (data: any) => {
        this.dataAttest =  data.data[0];
        this.totalItems = data.total;
      }
    )
  }
  selectAll() {
    for (var i = 0; i < this.dataAttest.length; i++) {
      this.dataAttest[i].etat = this.selectedAll;
    }
    this.getCheckedItemList();
  }
  checkIfAllSelected() {
    this.selectedAll = this.dataAttest.every(function(item:any) {
      return item.etat == 0;
    })
    this.getCheckedItemList();
  }
  getCheckedItemList() {
    this.checkedList = [];
    for (var i = 0; i < this.dataAttest.length; i++) {
      if(this.dataAttest[i].etat) {
        this.checkedList.push(this.dataAttest[i]);
        this.http.get(`${this.reqUrl}/validerAttestation/${this.dataAttest[i].id}`).subscribe(
          data => {
            this.result = data;
          }, error=> {
            this.errorMsg = error;
            this.toastr.error(this.errorMsg, 'Echec', {
             timeOut: 5000,
            });
           }
        )
      }
    }
    this.checkedList = this.checkedList;
  }

  openDetail(data) {
    this.router.navigate(['/accueil/deatilattestation'], {
      queryParams: {
        attestation: JSON.stringify(data)
      }
    });
  }

  openErrorModal(id: string) {
    this.errormodalService.open(id);
  }

  closeErrorModal(id: string) {
    this.errormodalService.close(id);
  }

  extraireAttestation() {
    if (this.filterForm.value.annee) {
      this.filterForm.patchValue({annee: this.filterForm.value.annee.getFullYear()});
    } else {
      this.filterForm.patchValue({annee: ''});
    }
    this.otherService.extraireAttestation(this.filterForm.value).subscribe(
      data => {
        this.data = data;
        this.successMsg = this.data.status
        if(this.successMsg == true) {
          window.open(data.data);
          this.toastr.success('Le fichier a été télécharger', 'Success', {
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

  exportCsv(): void {
    if(this.filterForm.value.mois) {
      this.mois = this.filterForm.value.mois;
    }
    if(this.filterForm.value.reference) {
      this.reference = this.filterForm.value.reference;
    }
    if(this.filterForm.value.annee) {
      this.annee = this.filterForm.value.annee; 
    }
    this.otherService.listAttestationFilter(this.page,this.itemsPerPage, this.mois, this.annee, this.reference).subscribe(
      (data: any) => {
        this.dataAttest =  data.data[0];
        this.extractionService.exportToCsv(
          this.dataAttest, 
          'ExtractionAttestation' + '-' + this.date.getFullYear() + '-' + this.date.getMonth() + '-' + this.date.getDay() + '-' + this.date.getHours()+ '-' + this.date.getMinutes(),
          ['reference', 'matricule', 'prenom', 'nom', 'agence', 'nombreJourAbscence', 'dateDebut', 'dateFin', 'prenom_manager', 'nom_manager', 'statut']
        );
        this.totalItems = data.total;
      }
    )
  }
}
