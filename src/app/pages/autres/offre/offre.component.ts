import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import { OthersService } from 'src/app/services/others.service';
import { ErrormodalService } from 'src/app/modal/_errormodals';

@Component({
  selector: 'app-offre',
  templateUrl: './offre.component.html',
  styleUrls: ['./offre.component.scss']
})
export class OffreComponent implements OnInit {

  p = 1;
  nouveauxRrecrus;
  datas: any;
  errorMsg: any;
  constructor(public router: Router,
    private dataService: DataService ,
    private errormodalService: ErrormodalService,
     private otherService: OthersService) { 

      this.otherService.getNouveauRecrus().subscribe(
        data => {
         this.nouveauxRrecrus = data.data;
        }
      );

    }

  ngOnInit() {
  }

  openErrorModal(id: string) {
    this.errormodalService.open(id);
  }

  closeErrorModal(id: string) {
    this.errormodalService.close(id);
  }

}
