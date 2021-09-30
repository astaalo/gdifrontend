import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { DataService } from 'src/app/service/data.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/modal/_modal';
import { OthersService } from 'src/app/services/others.service';
import { HttpClient } from '@angular/common/http';
import { ErrormodalService } from 'src/app/modal/_errormodals';

@Component({
  selector: 'app-interenattente',
  templateUrl: './interenattente.component.html',
  styleUrls: ['./interenattente.component.scss']
})
export class InterenattenteComponent implements OnInit {

  public data; any;
  public datas: any;
  date: any;
  role;
  dataInter: any;
  attestationForm: FormGroup;
  page = 1;
  itemsPerPage = 8;
  totalItems : any;
  form: FormGroup;
  checkedList:any;
  selectedAll: any;
  result;
  filterterm;
  public reqUrl = environment.base_url;
  errorMsg: any;
  filterForm: FormGroup;
  public cni = null;
  public poste = null;
  public agence = null;
  public societe = null;
  public direction = null;
  dataSociete: any;
  dataAgence: any;
  listeFonction: any;
  successMsg: any;
  dataDirection: any;
  constructor(public datepipe: DatePipe,
    public router: Router,
    private fb: FormBuilder,
    private modalService: ModalService,
    private otherService: OthersService,
    private errormodalService: ErrormodalService,
    private http: HttpClient,
    private toastr: ToastrService
    ) {
      this.form = this.fb.group({
        checkArray: this.fb.array([])
      });
    }

  ngOnInit() {
    this.role = localStorage.getItem('user')
    this.attestationForm = new FormGroup({
      interim_id: new FormControl(''),
      dateDebut: new FormControl(''),
      dateFin: new FormControl(''),
      contrat_id: new FormControl(''),
      nbr_jr_absence: new FormControl(''),
      periode_id: new FormControl(''),
      statut_id: new FormControl(''),
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
      cni: new FormControl(''),
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

  directionsListe(value) {
    this.otherService.getAllDirection(value).subscribe(
      data => {
        this.dataDirection = data['data'];
       }
    ); 
  }

  public saveProfession(e): void {
    let libelle = e.target.value;
    let list = this.listeFonction.filter(x => x.libelle === libelle)[0];
    this.filterForm.patchValue({poste: list.libelle});
  }
  
  gty(page: any){
    if (this.filterForm.value.poste == undefined) {
      this.filterForm.patchValue({poste: ''});
    }
    if(this.filterForm.value.poste) {
      this.poste = this.filterForm.value.poste;
    }
    if(this.filterForm.value.matricule) {
      this.cni = this.filterForm.value.cni;
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
    this.otherService.getInterimaireEnattente(page, this.itemsPerPage, this.cni, this.poste, this.agence, this.societe, this.direction).subscribe((data: any) => {
      this.dataInter =  data.data;
      this.totalItems = data.total;
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
          this.toastr.success(this.data.message, 'Success', {
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

  openDetail(data) {
    this.router.navigate(['/accueil/detailinter'], {
      queryParams: {
        user: JSON.stringify(data)
      }
    })
  }

  selectAll() {
    for (var i = 0; i < this.dataInter.length; i++) {
      this.dataInter[i].etat = this.selectedAll;
    }
    this.getCheckedItemList();
  }
  checkIfAllSelected(event) {
    this.selectedAll = this.dataInter.every(function(item:any) {
      return item.etat == 0;
    })
    this.getCheckedItemList();
  }
  getCheckedItemList() {
    this.checkedList = [];
    for (var i = 0; i < this.dataInter.length; i++) {
      if(this.dataInter[i].etat) {
        this.checkedList.push(this.dataInter[i]);
        this.http.post(`${this.reqUrl}/validerDemande/${this.dataInter[i].id}`, null).subscribe(
          data => {
            this.result = data;
          }
        )
      }
    }
    this.checkedList = this.checkedList;
  }
  downloadFile(data: any) {
    const replacer = (key, value) => (value === null ? '' : value); // specify how you want to handle null values here
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
