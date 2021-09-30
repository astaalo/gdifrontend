import { OthersService } from 'src/app/services/others.service';
import { Component, HostListener, OnInit } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexFill, ApexLegend, ApexPlotOptions, ApexResponsive, ApexXAxis, ApexYAxis, ChartComponent } from 'ng-apexcharts';
import { DataService } from 'src/app/service/data.service';
import { ErrormodalService } from 'src/app/modal/_errormodals';

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
  selector: 'app-statistiques',
  templateUrl: './statistiques.component.html',
  styleUrls: ['./statistiques.component.scss']
})
export class StatistiquesComponent implements OnInit {

  borderfilter1;
  colorfilter1;
  axex;
  mois;
  directs: any;
  directions: any;
  effectif;
  hommes: any;
  femmes: any;
  nouveau; 
  fini;
  total;
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
  dataStatistique;
  dataInterimByAgence: any;
  /*@ViewChild("chart")*/ chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  public chartOptions2: Partial<ChartOptions>;
  public chartOptions3: Partial<ChartOptions>;
  public chartOptions4: Partial<ChartOptions>;
  public chartOptions5: Partial<ChartOptions>;
  public chartOptions6: Partial<ChartOptions>;
  public chartOptions7: Partial<ChartOptions>;
  errorMsg: any;
  constructor(private dataService: DataService,
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
    this.datas = this.dataService.getData();
    const getDownloadProgress = () => {
      if (this.progress <= 99) {
        this.progress = 30;
        this.progress = this.progress - 2;
      } else {
        clearInterval(this.intervalId);
      }
    };
    this.intervalId = setInterval(getDownloadProgress, 1000);

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
}
