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
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.scss']
})
export class GenreComponent implements OnInit {

  borderfilter1;
  colorfilter1;
  axex;
  mois;
  directs: any;
  directions: any;
  effectif;
  dataSociete;
  data: any;
  pourcentFemme;
  pourcentFemmecercle;
  hommes: any;
  femmes: any;
  homme: any;
  femme: any;
  totalCercle: any;
  dataGenre;
  nouveau; 
  fini;
  total;
  id_societe= 1;
  date = new Date();
  societe = 1;
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
  dataStatEffectifGenre: any;
  dataStatistique;
  dataInterimByAgence: any;
  chart: ChartComponent;
  public chartOptions3: Partial<ChartOptions>;
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
    this.otherService.getAllSociete().subscribe(
      data => {
        this.dataSociete = data["data"];
        console.log(data);
      }
    );
    
    this.genrePourcentage(String(this.id_societe));
    this.societeSelectionner(String(this.societe));
  }

//premier

  genrePourcentage(id_societe){
    const getDownloadProgress = () => {
      this.otherService.statInterPourcent(id_societe).subscribe(
        data => {
          console.log(data);
          this.data = data;
          this.dataStatEffectifGenre = this.data.data[0];
          this.femme= this.dataStatEffectifGenre.femme;
          this.homme= this.dataStatEffectifGenre.homme;
          this.totalCercle= this.dataStatEffectifGenre.total;
          this.pourcentFemme = this.dataStatEffectifGenre.femmePourcent;
          this.pourcentFemmecercle = this.pourcentFemme - 2;
          console.log(this.dataStatEffectifGenre)
          clearInterval(this.intervalId);
        }
      )
    };
    this.intervalId = setInterval(getDownloadProgress, 1000);
  }
  ngOnDestroy() {
    console.log(this.intervalId);
    
    clearInterval(this.intervalId);
  }

  //deuxieme
  societeSelectionner(value:string){
    this.otherService.statTotalInter(value).subscribe(
      data => {
        console.log(data);
        this.data = data;
        this.dataStatEffectifGenre = this.data.data[0];
    this.directs = this.dataStatEffectifGenre;
    this.directions = this.dataStatEffectifGenre.map(valueOfDirection => valueOfDirection.direction);
    this.hommes = this.dataStatEffectifGenre.map(valueOfHomme => valueOfHomme.homme);
    this.femmes = this.dataStatEffectifGenre.map(valueOfFemmes => valueOfFemmes.femme);
    
    this.chartOptions3 = {
      colors: [
        "#009393",
        "#ff7900"
      ],
      series: [
        {
          name: "Hommes",
          data: this.hommes
        },
        {
          name: "Femmes",
          data: this.femmes
        }
      ],
      chart: {
        type: "bar",
        height: 280,
        width: 550,
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
          this.directions
      },
      legend: {
        show: false,
      },
      fill: {
        opacity: 4,
      },
    };
    return this.chartOptions3;
  },
  )
}
}