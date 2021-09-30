import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgxFileSaverService } from '@clemox/ngx-file-saver';
import { DataService } from 'src/app/service/data.service';
import { ModalService } from 'src/app/modal/_modal/modal.service';
import { environment } from 'src/environments/environment';
import { ErrormodalService } from 'src/app/modal/_errormodals';
import { OthersService } from 'src/app/services/others.service';
import { Router } from '@angular/router';


const CSV_EXTENSION = '.csv';
const CSV_TYPE = 'text/plain;charset=utf-8';

@Component({
  selector: 'app-attestationmesInterimaire',
  templateUrl: './attestationmesInterimaire.component.html',
  styleUrls: ['./attestationmesInterimaire.component.scss']
})
export class AttestationmesInterimaireComponent implements OnInit {

  p = 1;
  date = new Date();
  annee = null;
  mois = null;
  checkedList:any;
  selectedAll: any;
  filterForm: FormGroup;
  result;
  data: any;
  successMsg;
  filterterm: string;
  dataAttest: any;
  page = 1;
  itemsPerPage = 10;
  totalItems : any;
  user;
  public reqUrl = environment.base_url;
  errorMsg: any;
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
  lastTenYear;
  currentDate = new Date().getFullYear();
  reference = null;
  constructor(private extractionService: AuthService,
              private errormodalService: ErrormodalService,
              private otherService: OthersService,
              private router: Router,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.user = localStorage.getItem('user');
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
    this.filterForm = new FormGroup({
      mois: new FormControl(''),
      annee: new FormControl(''),
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
    this.otherService.listMesAttestationFilter(page,this.itemsPerPage, this.mois, this.annee, this.reference).subscribe(
      (data: any) => {
        this.dataAttest =  data.data[0];
        this.totalItems = data.total;
      }
    )
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
    // if (this.filterForm.value.annee) {
    //   this.filterForm.patchValue({annee: this.filterForm.value.annee.getFullYear()});
    // } else {
    //   this.filterForm.patchValue({annee: ''});
    // }
    this.otherService.extraireAttestation(this.filterForm.value).subscribe(
      data => {
        this.data = data;
        this.successMsg = this.data.status
        if(this.successMsg == true) {
          this.toastr.error('Le fichier a été télécharger', 'Success', {
            timeOut: 3000,
          });
          window.open(data.data);
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
    this.otherService.listMesAttestationFilter(this.page,this.itemsPerPage, this.mois, this.annee, this.reference).subscribe(
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
