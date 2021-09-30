import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { DataService } from 'src/app/service/data.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/modal/_modal';
import { OthersService } from 'src/app/services/others.service';
import { ErrormodalService } from 'src/app/modal/_errormodals';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-addattestation',
  templateUrl: './addattestation.component.html',
  styleUrls: ['./addattestation.component.scss']
})
export class AddattestationComponent implements OnInit {

  dataForm: String[][];
  nombrePage;
  public data; any;
  public datas: any;
  date: any;
  role;
  dataInter: any;
  attestationForm: FormGroup;
  periodForm: FormGroup;
  page = 1;
  itemsPerPage = 100;
  totalItems : any;
  filterterm;
  currentDate = new Date().getFullYear();
  lastTenYear;
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
  action = true;
  scrHeight:any;
  scrWidth:any;
  detailinter;
  constructor(public datepipe: DatePipe,
    public router: Router,
    private modalService: ModalService,
    private otherService: OthersService,
    private errormodalService: ErrormodalService,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
    ) {
      this.attestationForm = this.formBuilder.group({
        interDetail: this.formBuilder.array([
          {
            interim_id: new FormControl(''),
            commentaire: new FormControl(''),
            nbr_jr_absence: new FormControl('')
          }
        ]),
        annee: ['', Validators.required],
        mois: ['', Validators.required]
      });
      this.getScreenSize()
    }
    @HostListener('window:resize', ['$event'])
    getScreenSize(event?) {
      this.scrHeight = window.innerHeight;
      this.scrWidth = window.innerWidth;
    }

  ngOnInit() {
    this.periodForm = new FormGroup({
      annee: new FormControl(''),
      mois: new FormControl('')
    })
    this.role = localStorage.getItem('user');
    this.gty(this.page);
    this.getTenLastYear();
  }

  getTenLastYear() {
    this.lastTenYear = [
      {
        annee: this.currentDate
      },{
        annee: this.currentDate - 1
      },{
        annee: this.currentDate - 2
      }
    ];
    return this.lastTenYear
  }
  gty(page: any){
    this.http.get(this.reqUrl + `/interimSousContrat`).subscribe((data: any) => {
      this.dataInter =  data.data;
      this.totalItems = data.total;
      this.attestationForm = this.formBuilder.group({
        annee: ['', Validators.required],
        mois: ['', Validators.required],
        interDetail: this.formBuilder.array(
          this.dataInter.map(x => this.formBuilder.group({
            interim_id: [x.id, [Validators.required, Validators.minLength(1)]],
            nbr_jr_absence: [x.nbr_jr_absence, [Validators.required, Validators.minLength(1)]],
            commentaire: [x.commentaire, [Validators.required, Validators.minLength(2)]]
          }))
        )
      })
    })
  }

  attestaionFormGet(page) {
    if(this.totalItems % this.itemsPerPage == 0) {
      this.nombrePage = this.totalItems / this.itemsPerPage;
    } else {
      this.nombrePage = Math.floor(this.totalItems / this.itemsPerPage) + 1;
    }
    for(var i = 0; i < this.nombrePage; i++) {

    }
  }

  addAttestation() {
    this.detailinter = this.attestationForm.value.interDetail;
    this.detailinter.forEach((currentValue, index) => {
      if(!currentValue.nbr_jr_absence) {
          this.detailinter.splice(index, 1);
      }
    });
    this.attestationForm.patchValue({
      annee: this.periodForm.value.annee,
      mois: this.periodForm.value.mois,
    });
     this.otherService.addAttestationEnMasse(this.attestationForm.value).subscribe(
      data => {
        this.result = data
        this.successMsg = this.result.status
        if(this.successMsg == true) {
          this.toastr.success('Attestation ajouté avec success', 'Succes', {
            timeOut: 3000,
          });
          this.router.navigate(['/accueil/attestationmesinterimaires'])
        }
      }, error=> {
       this.errorMsg = error;
       this.toastr.error(this.errorMsg, 'Echec', {
        timeOut: 5000,
       });
      }
    )
  }
  changeActionFalse() {
    this.action = false;
  }
  changeActionTrue() {
    this.action = true;
  }
  openDetail(data) {
    this.router.navigate(['/accueil/detailinter'], {
      queryParams: {
        user: JSON.stringify(data)
      }
    })
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
