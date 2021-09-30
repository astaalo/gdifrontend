import { Component, HostListener, OnInit } from '@angular/core';
import { PaginationService } from 'src/app/service/pagination.service';
;

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  selected = 0;
  selected1 = 0;
  public click: any;
  public click1: any;
  public click2: any;
  public menus: any;
  user;
  scrHeight:any;
  scrWidth:any;
  
  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
        this.scrHeight = window.innerHeight;
        this.scrWidth = window.innerWidth;
  }
  constructor(
    private paginationService: PaginationService
  ) {
    this.getScreenSize(); 
    this.menus = this.paginationService.getMenu();
  }

  ngOnInit() {
    this.user = localStorage.getItem('user');
  }

  getMargin(event) {
    let margin = 5;
    if (event.id == 1) {
      margin = 30;
    } else if (event.id == 8) {
      margin = 40;
    } else  {
      margin = 5;
    } 
    return margin;
  }

  getColor(event) {
    let color = "#ff7900";
    if (event.liste) {
      color = "white";
    }  else  {
      color = "#ff7900";
    } 
    return color;
  }
}

