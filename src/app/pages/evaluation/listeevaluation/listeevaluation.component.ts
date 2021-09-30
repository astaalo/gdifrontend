import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { OthersService } from 'src/app/services/others.service';
import { ModalService } from 'src/app/modal/_modal';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrormodalService } from 'src/app/modal/_errormodals';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-listeevaluation',
  templateUrl: './listeevaluation.component.html',
  styleUrls: ['./listeevaluation.component.scss']
})
export class ListeevaluationComponent implements OnInit {

  role;
  commentaire;
  evaluations;
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
  errorMsg: any;
  constructor(private otherService: OthersService,
    private modalService: ModalService,
    private activeroute: ActivatedRoute,
    private errormodalService: ErrormodalService,
    private router: Router,
    private http: HttpClient,
    private toastr: ToastrService) {
    this.activeroute.queryParams.subscribe(params => {
      this.item = JSON.parse(params["interimaire"]);
    });
  }

  ngOnInit() {
    this.role = localStorage.getItem('user');
    this.objectifForm = new FormGroup({
      titre: new FormControl(''),
      description: new FormControl(''),
      interimaire: new FormControl(''),
      structure_id: new FormControl(''),
      bareme: new FormControl(''),
      date_objectif: new FormControl('')
    });
    this.noteForm = new FormGroup({
      note: new FormControl(''),
      commentaire: new FormControl('')
    });
    this.modifierForm = new FormGroup({
      titre: new FormControl(''),
      description: new FormControl('')
    });
    this.otherService.getOneInterById(this.item).subscribe(
      data =>{
        this.interimaire = data;
        this.objectifForm.patchValue({
          structure_id: this.interimaire.data.structure.id,
          interimaire: this.item
        });
      },
      error=> {
        this.errorMsg = error;
        this.errormodalService.open('error-modal-1');
      }
    );
    this.gty(this.page);
  }

  gty(page: any){
    this.http.get(this.reqUrl + `/listEvaluations/${this.item}?page=${page}&limit=${this.itemsPerPage}`).subscribe((data: any) => {
      this.data = data
      this.evaluations = this.data["data"];
      this.totalItems = data.total;
    })
  }

  addObject() {
    this.otherService.addObjectifs(this.objectifForm.value).subscribe(
      data =>{
        this.data = data;
        this.successMsg = this.data.status
        if(this.successMsg == true) {
          this.ngOnInit();
          this.closeModal('objectif-modal-1');
        }
      },
      error=> {
        this.errorMsg = error;
        this.closeModal('objectif-modal-1');
        this.toastr.error(this.errorMsg, 'Echec', {
          timeOut: 5000,
        });
      }
    );
  }

  notezObjectif(id) {
    this.otherService.notezObjectif(this.noteForm.value, id).subscribe(
      data =>{
        this.data = data;
        this.successMsg = this.data.status
        if(this.successMsg == true) {
          this.ngOnInit();
          this.closeModal('custom-modal-'+id);
        }
      },
      error=> {
        this.errorMsg = error;
        this.closeModal('custom-modal-'+id);
        this.toastr.error(this.errorMsg, 'Echec', {
          timeOut: 5000,
        });
      }
    )
  }
  modifierObjectif(id) {
    this.otherService.modifierObjectif(this.modifierForm.value, id).subscribe(
      data =>{
        this.data = data;
        this.successMsg = this.data.status
        if(this.successMsg == true) {
          this.ngOnInit();
          this.closeModal('custom-modal-'+id);
        }
      },
      error=> {
        this.errorMsg = error;
        this.closeModal('custom-modal-'+id);
        this.toastr.error(this.errorMsg, 'Echec', {
          timeOut: 5000,
        });
      }
    )
  }

  openDetail(interim_id, evaluation_id) {
    this.router.navigate(['/accueil/detailevaluation'], {
      queryParams: {
        interimaire: JSON.stringify(interim_id),
        evaluation: JSON.stringify(evaluation_id),
      }
    })
  }

  openEvaluer() {
    this.router.navigate(['/accueil/evaluer'], {
      queryParams: {
        interimaire: JSON.stringify(this.item),
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
