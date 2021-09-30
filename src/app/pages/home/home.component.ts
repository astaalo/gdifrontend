import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/service/data.service';
import { QueryBindingType } from '@angular/compiler/src/core';
import { OthersService } from 'src/app/services/others.service';
import { NavigationExtras, Router } from '@angular/router';
import { Component, HostListener, OnInit } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexPlotOptions, ApexResponsive, ApexXAxis, ApexYAxis, ApexLegend, ApexFill, ChartComponent } from 'ng-apexcharts';
import { ErrormodalService } from 'src/app/modal/_errormodals';
import { FormGroup, FormControl } from '@angular/forms';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  responsive: ApexResponsive[];
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  datalabels: ApexDataLabels,
  legend: ApexLegend;
  fill: ApexFill;
  colors: string[],
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  anneeForm: FormGroup;
  lastTenYear;
  societe = 1;
  date = new Date();
  dates;
  currentDate = new Date().getFullYear();
  dataSociete;
  mois = [
    {libelle: "Jan",},
    {libelle: "Fev",},
    {libelle: "Mar",},
    {libelle: "Avr",},
    {libelle: "Mai",},
    {libelle: "Jui",},
    {libelle: "Jul",},
    {libelle: "Aou",},
    {libelle: "Sep",},
    {libelle: "Oct",},
    {libelle: "Nov",},
    {libelle: "Dec",},
  ];
  dataInterFin;
  statInterimByAgnece;
  statInterAgence;
  prenom;
  manager;
  lastnotif;
  dataYear;
  axex;
  donneeAbscisse;
  data: any;
  annee=null;
  directions: any;
  effectif;
  hommes: any;
  femmes: any;
  nouveau; 
  fini;
  total;
  dataStatEffectifAnnee;
  color: any;
  public datas: any;
  public diagrammes: any;
  jan: any;
  pager: any = {};
  filterterm: string;
  pagedItems: any[];
  progress = 0;
  progressBar = document.querySelector(".progress-bar");
  intervalId;
  public restant: any;
  public nombre = 39;
  public left: any;
  scrHeight:any;
  scrWidth:any;
  user: any;
  showHome = true;
  id=1;
  errorMsg: any;
  id_societe= 1;
  pourcentFemme;
  pourcentFemmecercle;
  homme: any;
  femme: any;
  totalCercle: any;
  dataGenre;
  dataStatEffectifGenre: any;
  nouveauxRrecrus;
  pmc;
  present;
  malade;
  conge;
  photo;
  nomManager;
  prenomManager
  posteManager;
  photoManager;
  interimaireInfo;
  managerinfo: any;
  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
        this.scrHeight = window.innerHeight;
        this.scrWidth = window.innerWidth;
  }

  constructor(private errormodalService: ErrormodalService,
    public router: Router,
    private otherService: OthersService,
    private toastr: ToastrService) {
    this.getScreenSize();
    this.otherService.getInter().subscribe(
      data => {
        this.dataInterFin = data.data;
      }
    );

    
    this.otherService.getNouveauRecrus().subscribe(
      data => {
       this.nouveauxRrecrus = data.data;
      }
    );

    this.otherService.getStatPresence().subscribe(
      data => {
        this.pmc = data.data;
        this.present = this.pmc.present;
        this.malade = this.pmc.malade;
        this.conge = this.pmc.conge;
      }
    );
  }


  ngOnInit() {
    this.prenom = localStorage.getItem('prenom');
    this.user = localStorage.getItem('user');
    if(this.user == 'INT') {
      this.interimaireInfo = JSON.parse(localStorage.getItem('currentUser'));
      this.otherService.getDetailsManagerById(this.interimaireInfo.manager.id).subscribe( 
        result => {
          this.data = result;
          this.managerinfo = this.data.data.detail;
          console.log(this.managerinfo);
          
          this.prenomManager = this.managerinfo.prenom;
          this.nomManager = this.managerinfo.nom;
          this.photoManager = this.managerinfo.photo;
          this.posteManager = this.managerinfo.fonction;
        }
      )
    }
    console.log(this.interimaireInfo);
      if(this.user == 'INT') {
        this.showHome = false;
      } else {
        this.showHome = true;
      }
      this.otherService.getInter().subscribe(
        data => {
        this.dataInterFin = data.data;
        }
      );

     
      this.getTenLastYear();
      this.otherService.getAllSociete().subscribe(
        data => {
          this.dataSociete = data["data"];
        }
      );
      this.anneeForm = new FormGroup({
        annee: new FormControl('')
      })
      
      this.dateSelectionner(this.annee);
      this.onChanges();

         
      this.otherService.getLastNotification().subscribe(
        data => {
          if(data.data){
            this.lastnotif =data.data[0].description;
          }else{
            this.lastnotif ="Aucune notification "

          }
        }
      );
      this.otherService.getAllSociete().subscribe(
        data => {
          this.dataSociete = data["data"];
        }
      );
      
      this.genrePourcentage(String(this.id_societe));
    }



    openDetails(data) {
      this.router.navigate(['/accueil/detailinter'], {
        queryParams: {
          user: JSON.stringify(data)
        }
      })
    }  
  
  //premier
  
    genrePourcentage(id_societe){
      const getDownloadProgress = () => {
        this.otherService.statInterPourcent(id_societe).subscribe(
          data => {
            this.data = data;
            this.dataStatEffectifGenre = this.data.data[0];
            this.femme= this.dataStatEffectifGenre.femme;
            this.homme= this.dataStatEffectifGenre.homme;
            this.totalCercle= this.dataStatEffectifGenre.total;
            this.pourcentFemme = this.dataStatEffectifGenre.femmePourcent;
            this.pourcentFemmecercle = this.pourcentFemme - 2;
            clearInterval(this.intervalId);
          }
        )
      };
      this.intervalId = setInterval(getDownloadProgress, 1000);
    }
    

  onChanges(): void {
    this.anneeForm.get('annee').valueChanges.subscribe(val => {
      if (val) {
        this.dateSelectionner(val);
      }
    });
  }

  getTenLastYear() {
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
      },{
        annee: this.currentDate - 5
      },{
        annee: this.currentDate - 6
      },{
        annee: this.currentDate - 7
      },{
        annee: this.currentDate - 8
      },{
        annee: this.currentDate - 9
      },
    ];
    return this.lastTenYear
  }

  dateSelectionner(value){
    if(value == "null"){
      value = null;
    }
    this.otherService.statInterByYear(this.annee, this.societe).subscribe(
      data => {
        this.dataYear = data;
        this.dataStatEffectifAnnee = this.dataYear.data;
        if(value == null) {
          this.donneeAbscisse = this.dataStatEffectifAnnee.map(valueOfDirection => valueOfDirection.annee);
          this.nouveau = this.dataStatEffectifAnnee.map(valueOfNouveau => valueOfNouveau.nouveaux);
          this.fini = this.dataStatEffectifAnnee.map(valueOfFini => valueOfFini.fin);
          this.total = this.dataStatEffectifAnnee.map(valueOfTotal => valueOfTotal.total);
        } else {
          this.donneeAbscisse = this.dataStatEffectifAnnee.map(valueOfDirection => valueOfDirection.mois);
          this.nouveau = this.dataStatEffectifAnnee.map(valueOfNouveau => valueOfNouveau.nouveaux);
          this.fini = this.dataStatEffectifAnnee.map(valueOfFini => valueOfFini.fin);
          this.total = this.dataStatEffectifAnnee.map(valueOfTotal => valueOfTotal.total);
        }
        this.axex = this.donneeAbscisse;
        
        this.chartOptions = {
          colors: [
            "#ff0000",
            "#009393",
            "#000000",
          ],
          series: [
            {
              name: "Finis",
              data: this.fini
            },
            {
              name: "Nouveaux",
              data: this.nouveau
            },
            {
              name: "Total",
              data: this.total
            },
          ],
          chart: {
            type: "bar",
            height: 210,
            width: 338,
            stacked: true,
            toolbar: {
              show: false
            },
            zoom: {
              enabled: false
            }
          },
          responsive: [
            {
              breakpoint: 480,
              options: {
                legend: {
                  show: false,
                  position: "bottom",
                  offsetX: -10,
                  offsetY: 0
                }
              }
            }
          ],
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: "20px",
            },
          },
          dataLabels: {
            enabled: false,
            style: {
              colors: ['#f3f4f5', '#fff']
            }
          },
          xaxis: {
            type: "category",
            categories: 
              this.axex
          },
          legend: {
            show: false,
          },
          fill: {
            opacity: 4,
          },
        };
        return this.chartOptions;
    }
    )
  }
  
  getColor(p) {
    if(p.isAdmissible == true) {
      this.color = "#6dd400";
    } else if (p.isAdmissible == false) {
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

   chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  getwidth() {
    this.restant = this.nombre + "%";
    return this.restant;
  }
  getposition() {
    let left1 = this.nombre - 1;
    this.left = left1 + "%";
    return this.left;
  }
  openErrorModal(id: string) {
    this.errormodalService.open(id);
  }

  closeErrorModal(id: string) {
    this.errormodalService.close(id);
  }
}
