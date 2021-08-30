import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ErrormodalService } from 'src/app/modal/_errormodals/errormodal.service';
import { OthersService } from 'src/app/services/others.service';

@Component({
  selector: 'app-listsite',
  templateUrl: './listsite.component.html',
  styleUrls: ['./listsite.component.scss']
})
export class ListsiteComponent implements OnInit {
  scrHeight: number;
  scrWidth: number;
  progress: number;
  // data: any;
  page = 1;
  filterForm: FormGroup;
  itemParPage = 900;
  public region = null;
  intervalId;
  dataSite;
  dataRegion;
  dataStatistique: any;
  show = 1;
  color: string;
  jan: string;
  show1: boolean;
  color1 = "#ff7900";
  border1 = "1px solid #ff7900";
  color2 = "#000";
  border2= "1px solid #000";
  
  constructor(
    private errormodalService: ErrormodalService,
              private otherService: OthersService) {
    this.getScreenSize();
  }
  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
        this.scrHeight = window.innerHeight;
        this.scrWidth = window.innerWidth;
  }
  ngOnInit() {
    const getDownloadProgress = () => {
      if (this.progress <= 99) {
        this.progress = 30;
        this.progress = this.progress - 2;
      } else {
        clearInterval(this.intervalId);
      }
    };

  
    this.filterForm = new FormGroup({
      region: new FormControl('')
    });
  
    this.intervalId = setInterval(getDownloadProgress, 1000);

    this.gty(this.page);
    this.regionListe();
   
  
  }


  regionListe() {
    this.otherService.getAllRegion().subscribe(
      data => {
        this.dataRegion = data["data"];
      }
    );
    }

  gty(page: any){
    this.region=this.filterForm.value.region;
    if(this.region =='') {
      this.region = null;
    } 
    console.log(this.region)
    this.otherService.listeSite(page, this.itemParPage, this.region).subscribe(
      data => {
        console.log(data);
        this.dataSite = data.data;
      }
    )
  }
  

  //stats des interimaires par mois
  statInterMonth(value) {
    this.otherService.statInterByMonth(value).subscribe(
      data => {
        this.dataStatistique = data['data'];
       },
    ); 
  }

  changeshow1() {
    this.show = 1;
    return this.show;
  }
  changeshow2() {  
    this.show = 2;
    return this.show;
  }
  changeshow3() {  
    this.show = 3;
    return this.show;
  }
  changeshow4() {  
    this.show = 4;
    return this.show;
  }
  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  getColor(p) {
    if(p.statut == "oui") {
      this.color = "#6dd400";
    } else if (p.statut == "non") {
      this.color = "#f03737";
    }
    return this.color;
  }

 
  getHeight2(p) {
    if(p.id == 2) {
      var total = p.total * 0.145 
      this.jan = total + "px"
    } 
    return this.jan;
  } 

  openErrorModal(id: string) {
    this.errormodalService.open(id);
  }

  closeErrorModal(id: string) {
    this.errormodalService.close(id);
  }

  changeShow1() {
    this.show = 1;
    this.color1 = "#ff7900";
    this.border1 = "1px solid #ff7900";
    this.color2 = "#000";
    this.border2= "1px solid #000";
    return this.show1;
  }
  changeShow2() {  
    this.show = 2;
    this.color1 = "#000";
    this.border1 = "1px solid #000";
    this.border2 = "1px solid #ff7900";
    this.color2 = "#ff7900";
    return this.show1;
  }

}
