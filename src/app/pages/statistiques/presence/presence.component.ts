import { ToastrModule, ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit, HostListener } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexPlotOptions, ApexResponsive, ApexXAxis, ApexYAxis, ApexLegend, ApexFill, ChartComponent } from 'ng-apexcharts';
import { OthersService } from 'src/app/services/others.service';
import { AuthService } from 'src/app/services/auth.service';

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
export type ChartOptions3 = {
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
  colors: ["#009393", "#ff7900"],
};
@Component({
  selector: 'app-presence',
  templateUrl: './presence.component.html',
  styleUrls: ['./presence.component.scss']
})
export class PresenceComponent implements OnInit {

  borderfilter1;
  colorfilter1;
  axex;
  mois;
  annee= null;
  anneeForm: FormGroup;
  societeForm: FormGroup;
  lastTenYear;
  societe = 1;
  dataSociete;
  dataPresence;
  directs: any;
  directions: any;
  effectif;
  total;
  present;
  malade;
  conge;
  mission;
  convenancePerso;
  congeAnnuelle;
  congeMaladie;
  show = 1;
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
  scrHeight:any;
  scrWidth:any;
  dates;
  currentDate = new Date().getFullYear();
  item;
  dataStatEffectifPresence: any;
  dataStatSocietePresence: any;
  dataStatistique;
  dataInterimByAgence: any;
  chart: ChartComponent;
  public chartOptions4: Partial<ChartOptions>;
  public chartOptions5: Partial<ChartOptions>;
  date = new Date();
  dataInter: object[];
    
  constructor(private toastr: ToastrService,
    private extractionService: AuthService,
              private otherService: OthersService) {
                this.getScreenSize();
  }
  
  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
        this.scrHeight = window.innerHeight;
        this.scrWidth = window.innerWidth;
  }
  ngOnInit() {
    
    this.getTenLastYear();
    this.otherService.getAllSociete().subscribe(
      data => {
        this.dataSociete = data["data"];
      }
    );
    this.anneeForm = new FormGroup({
      anneeA: new FormControl(''),
      societeA: new FormControl(''),
    })
    this.societeForm = new FormGroup({
      anneeS: new FormControl(''),
      societeS: new FormControl(''),
    })
    this.dateSelectionnerPresence(this.annee, this.societe);
    this.societeSelectionnerPresence(this.societe);
    this.onChanges();
  }

  onChanges(): void {
    // this.anneeForm.get('annee').valueChanges.subscribe(val => {
    //   if (val) {
    //     this.dateSelectionnerPresence(val);
    //   }
    // });
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

  dateSelectionnerPresence(annee, societe){
   
    this.otherService.getStatPresenceTab(annee, societe).subscribe(
      data => {
        this.dataPresence = data;
        this.dataStatEffectifPresence = this.dataPresence.data;
        if(annee == null) {
          this.axex = this.dataStatEffectifPresence.map(valueOfDirection => valueOfDirection.annee);
          this.malade = this.dataStatEffectifPresence.map(valueOfMalade => valueOfMalade.malade);
          this.conge = this.dataStatEffectifPresence.map(valueOfConge => valueOfConge.conge);
        }else {
          this.axex = this.dataStatEffectifPresence.map(valueOfDirection => valueOfDirection.mois);
          this.malade = this.dataStatEffectifPresence.map(valueOfMalade => valueOfMalade.malade);
          this.conge = this.dataStatEffectifPresence.map(valueOfConge => valueOfConge.conge);      
        }
    this.chartOptions4 = {
      colors: [
        "#ff7900",
        "#000000",
      ],
      series: [
      
        {
          name: "Malades",
          data: this.malade
        },
        {
          name: "Congés",
          data: this.conge
        },
      ],
      chart: {
        type: "bar",
        height: 380,
        width: 750,
        stacked: false,
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
          columnWidth: "50px",
        //  endingShape: "rounded",
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
    return this.chartOptions4;
    })
  }

  societeSelectionnerPresence(societe){
    this.otherService.statDemandeDirection(societe).subscribe(
      data => {
        this.dataPresence = data;
        this.dataStatSocietePresence = this.dataPresence.data;
    this.directions = this.dataStatSocietePresence.map(valueOfDirection => valueOfDirection.direction);
    this.mission = this.dataStatSocietePresence.map(valueOfMission=> parseInt(valueOfMission.mission));
    this.congeMaladie = this.dataStatSocietePresence.map(valueOfCongeMaladie => parseInt(valueOfCongeMaladie.congeMaladie));
    this.congeAnnuelle = this.dataStatSocietePresence.map(valueOfCongeAnnuelle => parseInt(valueOfCongeAnnuelle.congeAnnuelle));
    this.convenancePerso = this.dataStatSocietePresence.map(valueOfConvenancePerso => parseInt(valueOfConvenancePerso.convenancePerso));
    this.chartOptions5 = {
      colors: [
        "#ff7900",
        "#009393",
        "#000000",
        "#124d68",
      ],
      series: [
        {
          name: "Mission",
          data: this.mission
        },
        {
          name: "Convenance Personnelle",
          data: this.convenancePerso
        },
        {
          name: "Congés Maladie",
          data: this.congeMaladie
        },
        {
          name: "Congés Annuelle",
          data: this.congeAnnuelle
        },
      ],
      chart: {
        type: "bar",
        height: 380,
        width: 750,
        stacked: false,
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
          columnWidth: "30px",
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
          this.directions
      },
      legend: {
        show: false,
      },
      fill: {
        opacity: 4,
      },
    };
    return this.chartOptions5;
  })
  }

  exportCsv(annee, societe): void {
    if(annee == undefined) {
      annee = null;
    }
    if(societe == undefined) {
      societe = 1;
    }
    this.dateSelectionnerPresence(annee, societe);
    this.otherService.getStatPresenceTab(annee, societe).subscribe((data: any) => {
      this.dataInter =  data.data;
      if(annee == null) {
        this.extractionService.exportToCsv(
          this.dataInter, 
          'ExtractionStatAnnee' + '-' + this.date.getFullYear() + '-' + this.date.getMonth() + '-' + this.date.getDay() + '-' + this.date.getHours()+ '-' + this.date.getMinutes(),
          ['annee', 'malade', 'conge']
        );
      } else {
        this.extractionService.exportToCsv(
          this.dataInter, 
          'ExtractionStatMois' + '-' + this.date.getFullYear() + '-' + this.date.getMonth() + '-' + this.date.getDay() + '-' + this.date.getHours()+ '-' + this.date.getMinutes(),
          ['mois', 'malade', 'conge']
        );
      }
    })
  }

  exportCsv1(societe): void {
    // if(annee == undefined) {
    //   annee = null;
    // }
    if(societe == undefined) {
      societe = 1;
    }
    this.societeSelectionnerPresence(societe);
    this.otherService.statDemandeDirection(societe).subscribe((data: any) => {
      this.dataInter =  data.data;
      if(this.annee == null) {
        this.extractionService.exportToCsv(
          this.dataInter, 
          'ExtractionStatAnnee' + '-' + this.date.getFullYear() + '-' + this.date.getMonth() + '-' + this.date.getDay() + '-' + this.date.getHours()+ '-' + this.date.getMinutes(),
          ['direction', 'mission', 'congeMaladie', 'congeAnnuelle', 'convenancePerso']
        );
      } else {
        this.extractionService.exportToCsv(
          this.dataInter, 
          'ExtractionStatMois' + '-' + this.date.getFullYear() + '-' + this.date.getMonth() + '-' + this.date.getDay() + '-' + this.date.getHours()+ '-' + this.date.getMinutes(),
          ['direction', 'mission', 'congeMaladie', 'congeAnnuelle', 'convenancePerso']
        );
      }
    })
  }
}
