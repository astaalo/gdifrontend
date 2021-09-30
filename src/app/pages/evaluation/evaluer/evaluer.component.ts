import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { OthersService } from 'src/app/services/others.service';
import { ModalService } from 'src/app/modal/_modal';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrormodalService } from 'src/app/modal/_errormodals';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-evaluer',
  templateUrl: './evaluer.component.html',
  styleUrls: ['./evaluer.component.scss']
})
export class EvaluerComponent implements OnInit {

  role;
  commentaire;
  objectif;
  item;
  data;
  interimaire;
  prenon;
  prenom;
  evaluerForm: FormGroup;
  note;
  nom;
  successMsg;
  objectifForm: FormGroup;
  noteForm: FormGroup;
  modifierForm: FormGroup;
  titremodif;
  descriptionmodif;
  page = 1;
  itemsPerPage = 2;
  totalItems : any;
  dataInter;
  interimConnect;
  public reqUrl = environment.base_url;
  errorMsg: any;
  detailNotation;
  constructor(private otherService: OthersService,
    private modalService: ModalService,
    private activeroute: ActivatedRoute,
    private errormodalService: ErrormodalService,
    private http: HttpClient,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService) {
    this.activeroute.queryParams.subscribe(params => {
      this.item = JSON.parse(params["interimaire"]);
    });
    this.evaluerForm = this.formBuilder.group({
      interimaireId: ['', Validators.required],
      commentaire: ['', Validators.required],
      dateDebut: ['', Validators.required],
      dateFin: ['', Validators.required],
      libelle: ['', Validators.required],
      notation: this.formBuilder.array([
        {
          objectifId: new FormControl(''),
          commentaire: new FormControl(''),
          note: new FormControl('')
        }
      ]),
    });
    this.otherService.getOneInterById(this.item).subscribe(
      data =>{
        this.data = data;
        this.dataInter = this.data.data;
        this.nom = this.dataInter.nom;
        this.prenom = this.dataInter.prenom;
      }
    );
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
    
    this.gty(this.page);
  }

  gty(page: any){
    this.http.get(this.reqUrl + `/listeObjectifs/${this.item}`).subscribe((data: any) => {
      this.data = data
      this.totalItems = data.total;
      this.objectif = this.data["data"];
      this.evaluerForm = this.formBuilder.group({
        interimaireId: this.item,
        commentaire: ['', Validators.required],
        dateDebut: ['', Validators.required],
        dateFin: ['', Validators.required],
        libelle: ['', Validators.required],
        notation: this.formBuilder.array(
          this.objectif.map(x => this.formBuilder.group({
            objectifId: [x.id, [Validators.required, Validators.minLength(1)]],
            note: [x.note, [Validators.required, Validators.minLength(1)]],
            commentaire: [x.commentaire, [Validators.required, Validators.minLength(2)]]
          }))
        )
      })
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
      }, error=> {
        this.errorMsg = error;
        this.closeModal('objectif-modal-1');
        this.toastr.error(this.errorMsg, 'Echec', {
         timeOut: 5000,
        });
      }
    );
  }

  evaluer() {
    this.detailNotation = this.evaluerForm.value.notation;
    this.detailNotation.forEach((currentValue, index) => {
      if(!currentValue.note || currentValue.note == null || currentValue.note == "") {
          this.detailNotation.splice(index, 1);
      }
    });
    this.otherService.evaluer(this.evaluerForm.value).subscribe(
      data =>{
        this.data = data;
        this.successMsg = this.data.status
        if(this.successMsg == true) {
          this.toastr.success(this.data.message, 'Success', {
            timeOut: 3000,
          });
          this.router.navigate(['/accueil/listeevaluation'], {
            queryParams: {
              interimaire: JSON.stringify(this.item),
            }
          })
        }
      }, error=> {
        this.errorMsg = error;
        this.toastr.error(this.errorMsg, 'Echec', {
         timeOut: 5000,
        });
      }
    )
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
      }, error=> {
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
