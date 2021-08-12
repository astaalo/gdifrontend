import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit, HostListener } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexPlotOptions, ApexResponsive, ApexXAxis, ApexYAxis, ApexLegend, ApexFill, ChartComponent } from 'ng-apexcharts';
import { DataService } from 'src/app/service/data.service';
import { ErrormodalService } from 'src/app/_errormodals';
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
  lastTenYear;
  societe;
  dataSociete;
  dataPresence;
  directs: any;
  directions: any;
  effectif;
  total;
  present;
  malade;
  conge;
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
  constructor(private dataService: DataService,
    private errormodalService: ErrormodalService,
              private otherService: OthersService) {
                this.getScreenSize();
  }
  
  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
        this.scrHeight = window.innerHeight;
        this.scrWidth = window.innerWidth;
        console.log(this.scrHeight, this.scrWidth);
  }
  ngOnInit() {
    
    this.getTenLastYear();
    this.otherService.getAllSociete().subscribe(
      data => {
        console.log(data);
        this.dataSociete = data["data"];
      }
    );
    this.anneeForm = new FormGroup({
      annee: new FormControl('')
    })
    this.dateSelectionnerPresence(this.annee);
    this.societeSelectionnerPresence(this.societe);
    this.onChanges();
  }

  onChanges(): void {
    this.anneeForm.get('annee').valueChanges.subscribe(val => {
      if (val) {
        console.log(val);
        
        this.dateSelectionnerPresence(val);
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
    console.log(this.lastTenYear);
    
    return this.lastTenYear
  }

  dateSelectionnerPresence(value: string){
    this.otherService.getStatPresenceTab(value).subscribe(
      data => {
        console.log(data);
        this.dataPresence = data;
        this.dataStatEffectifPresence = this.dataPresence.data[0];
        console.log(this.dataStatEffectifPresence);
    this.axex = this.dataStatEffectifPresence.map(valueOfDirection => valueOfDirection.annee);
    this.present = this.dataStatEffectifPresence.map(valueOfPresent => valueOfPresent.present);
    this.malade = this.dataStatEffectifPresence.map(valueOfMalade => valueOfMalade.malade);
    this.conge = this.dataStatEffectifPresence.map(valueOfConge => valueOfConge.conge);
    this.chartOptions4 = {
      colors: [
        "#ff0000",
        "#009393",
        "#000000",
      ],
      series: [
        {
          name: "Présents",
          data: this.present
        },
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
        height: 300,
        width: 550,
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
          columnWidth: "10px",
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

  societeSelectionnerPresence(value){
    this.otherService.getStatPresenceTab(value).subscribe(
      data => {
        console.log(data);
        this.dataPresence = data;
        this.dataStatSocietePresence = this.dataPresence.data[0];
    this.directions = this.dataStatSocietePresence.map(valueOfDirection => valueOfDirection.directions);
    this.present = this.dataStatSocietePresence.map(valueOfPresent=> valueOfPresent.present);
    this.malade = this.dataStatSocietePresence.map(valueOfMalade => valueOfMalade.malade);
    this.conge = this.dataStatSocietePresence.map(valueOfConge => valueOfConge.conge);
    this.chartOptions5 = {
      colors: [
        "#ff0000",
        "#009393",
        "#000000",
      ],
      series: [
        {
          name: "Présents",
          data: this.present
        },
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
        height: 300,
        width: 550,
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
          columnWidth: "10px",
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
    return this.chartOptions5;
  })
  }
}
