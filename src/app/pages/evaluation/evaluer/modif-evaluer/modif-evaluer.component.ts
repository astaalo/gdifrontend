import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { OthersService } from 'src/app/services/others.service';
import { ModalService } from 'src/app/modal/_modal';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrormodalService } from 'src/app/modal/_errormodals';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-modif-evaluer',
  templateUrl: './modif-evaluer.component.html',
  styleUrls: ['./modif-evaluer.component.scss']
})
export class ModifEvaluerComponent implements OnInit {

  role;
  commentaire;
  objectif;
  item;
  interim_id;
  evaluation_id;
  data;
  interimaire;
  prenon;
  prenom;
  evaluerForm: FormGroup;
  note;
  nom;
  libelle;
  successMsg;
  objectifForm: FormGroup;
  noteForm: FormGroup;
  modifierForm: FormGroup;
  titremodif;
  descriptionmodif;
  dataEvaluation;
  dateDebut;
  dateFin;
  page = 1;
  itemsPerPage = 2;
  totalItems : any;
  dataInter;
  interimConnect;
  public reqUrl = environment.base_url;
  errorMsg: any;
  notations: any;
  detailNotation: any;
  constructor(private otherService: OthersService,
    private modalService: ModalService,
    private activeroute: ActivatedRoute,
    private errormodalService: ErrormodalService,
    private router: Router,
    private formBuilder: FormBuilder) {
    this.activeroute.queryParams.subscribe(params => {
      this.interim_id = JSON.parse(params["interimaire"]);
      this.evaluation_id = JSON.parse(params["evaluation"]);
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
          id: new FormControl(''),
          commentaire: new FormControl(''),
          note: new FormControl('')
        }
      ]),
    });
    this.otherService.getOneInterById(this.interim_id).subscribe(
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
    this.otherService.getOneEvaluation(this.evaluation_id).subscribe(
      data =>{
        this.data = data;
        this.dataEvaluation = this.data.data;
        this.dateDebut = this.dataEvaluation.dateDebut;
        this.dateFin = this.dataEvaluation.dateFin;
        this.note = this.dataEvaluation.note;
        this.libelle = this.dataEvaluation.libelle;
        this.commentaire = this.dataEvaluation.commentaire;
        this.notations = this.dataEvaluation.notation;
        this.evaluerForm = this.formBuilder.group({
          interimaireId: this.interim_id,
          commentaire: ['', Validators.required],
          dateDebut: ['', Validators.required],
          dateFin: ['', Validators.required],
          libelle: ['', Validators.required],
          notation: this.formBuilder.array(
            this.notations.map(x => this.formBuilder.group({
              id: [x.id, [Validators.required, Validators.minLength(1)]],
              objectifId: [x.objectif.id, [Validators.required, Validators.minLength(1)]],
              note: [x.note, [Validators.required, Validators.minLength(1)]],
              commentaire: [x.commentaire, [Validators.required, Validators.minLength(2)]]
            }))
          )
        })
      }
    )
  }


  evaluer() {
    this.detailNotation = this.evaluerForm.value.notation;
    this.detailNotation.forEach((currentValue, index) => {
      if(!currentValue.note || currentValue.note === null) {
          this.detailNotation.splice(index, 1);
      }
    });
    this.otherService.updateEvaluation(this.evaluerForm.value, this.evaluation_id).subscribe(
      data =>{
        this.data = data;
        this.successMsg = this.data.status
        if(this.successMsg == true) {
          this.router.navigate(['/accueil/detailevaluation'], {
            queryParams: {
              interimaire: JSON.stringify(this.interim_id),
              evaluation: JSON.stringify(this.evaluation_id),
            }
          })
        }
      },
      error=> {
        this.errorMsg = error;
        this.errormodalService.open('error-modal-1');
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
