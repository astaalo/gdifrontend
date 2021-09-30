import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, HostListener } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexPlotOptions, ApexResponsive, ApexXAxis, ApexYAxis, ApexLegend, ApexFill, ChartComponent } from 'ng-apexcharts';
import { OthersService } from 'src/app/services/others.service';

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
  selector: 'app-statagence',
  templateUrl: './statagence.component.html',
  styleUrls: ['./statagence.component.scss']
})
export class StatagenceComponent implements OnInit {

  firstsocieteForm: FormGroup;
  borderfilter1;
  colorfilter1;
  axex;
  mois;
  nom;
  directs: any;
  directions: any;
  effectif;
  hommes: any;
  femmes: any;
  actifs; 
  inactifs;
  total;
  dataAgence;
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
  dataStatEffectifAnnee: any;
  dataStatEffectifService: any;
  dataStatistique;
  dataInterimByAgence: any;
  chart: ChartComponent;
  public chartOptions6: Partial<ChartOptions>;
  public chartOptions7: Partial<ChartOptions>;
  data: Object;
  lastTenYear: { annee: number; }[];
  dataSociete: any;
  constructor(private toastr: ToastrService,
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
    this.firstsocieteForm = new FormGroup({
      firstannee: new FormControl(''),
      firstsociete: new FormControl('')
    })
    
    this.dateSelectionnerAgence();
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
  
  dateSelectionnerAgence(){
    this.otherService.statInterByAgence().subscribe(
      data => {
        this.dataAgence = data;
        this.dataInterimByAgence = this.dataAgence.data[0];
    this.axex = this.dataInterimByAgence.map(valueOfDirection => valueOfDirection.nom);
    this.actifs = this.dataInterimByAgence.map(valueOfActifs => valueOfActifs.actifs);
    this.inactifs = this.dataInterimByAgence.map(valueOfInactifs => valueOfInactifs.inactifs);
    this.total = this.dataInterimByAgence.map(valueOfTotal => valueOfTotal.total);
    this.chartOptions6 = {
      colors: [
        "#ff0000",
        "#009393",
        "#000000",
      ],
      series: [
        {
          name: "Inactifs",
          data: this.inactifs
        },
        {
          name: "Actifs",
          data: this.actifs
        },
        {
          name: "Total",
          data: this.total
        },
      ],
      chart: {
        type: "bar",
        height: 380,
        width: 700,
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
    return this.chartOptions6;
    })
  }

}
