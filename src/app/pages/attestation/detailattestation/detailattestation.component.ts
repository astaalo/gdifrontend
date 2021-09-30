import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalService } from 'src/app/modal/_modal';
import { DataService } from 'src/app/service/data.service';
import { OthersService } from 'src/app/services/others.service';
import { NgxFileSaverService } from '@clemox/ngx-file-saver';
import { ErrormodalService } from 'src/app/modal/_errormodals';
import { HttpClient } from '@angular/common/http';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-detailattestation',
  templateUrl: './detailattestation.component.html',
  styleUrls: ['./detailattestation.component.scss']
})
export class DetailattestationComponent implements OnInit {

  public item;
  public prenom;
  public nom;
  public prenom_manager;
  public nom_manager;
  public agence;
  public departement;
  public service;
  public societeLibelle;
  public direction;
  public reference;
  public dateDebut;
  public dateFin;
  public annee_periode;
  public etat;
  public matricule;
  public matricule_manager;
  public mois_periode;
  public nombreJourAbsence;
  public posteManager;
  public dataAttestation;
  errorMsg: any;
  constructor(private activeroute: ActivatedRoute,
              private modalService: ModalService,
              private otherService: OthersService,
              private errormodalService: ErrormodalService,
              public router: Router, ) { 
    this.activeroute.queryParams.subscribe(params => {
      this.item = JSON.parse(params["attestation"]);
      this.otherService.getOneAttestation(this.item).subscribe(
        data =>{
          this.dataAttestation = data.data[0];
          this.nom = this.dataAttestation.nom;
          this.prenom = this.dataAttestation.prenom;
          this.departement = this.dataAttestation.departement;
          this.service = this.dataAttestation.service;
          this.reference = this.dataAttestation.reference;
          this.matricule = this.dataAttestation.matricule;
          this.etat = this.dataAttestation.etat;
          this.posteManager = this.dataAttestation.posteManager;
          this.prenom_manager = this.dataAttestation.prenom_manager;
          this.nom_manager = this.dataAttestation.nom_manager;
          this.nombreJourAbsence = this.dataAttestation.nombreJourAbsence;
          this.matricule_manager = this.dataAttestation.matricule_manager;
          this.societeLibelle = this.dataAttestation.societeLibelle;
          this.annee_periode = this.dataAttestation.annee_periode;
          this.mois_periode = this.dataAttestation.mois_periode;
          this.dateDebut = this.dataAttestation.dateDebut;
          this.dateFin = this.dataAttestation.dateFin;
          this.agence = this.dataAttestation.agence;
        }
      );
    })
    
  }
  ngOnInit() {
    
  }

  public openPDF(prenom, nom):void {
    let data = document.getElementById('htmlData');
    html2canvas(data).then(canvas => {
      let fileWidth = 208;
      let fileHeight = canvas.height * fileWidth / canvas.width;
      const fileuri = canvas.toDataURL('image/png');
      let pdf = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      pdf.addImage(fileuri, 'PNG', 0, position, fileWidth, fileHeight)
      pdf.save('Attestation-présence-' + prenom+ '-' + nom + '.pdf');
    });     
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
