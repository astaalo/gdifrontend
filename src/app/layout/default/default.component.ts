import { Component, OnInit } from '@angular/core';
import { SidenavService } from 'src/app/modal/sidenav/sidenav.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {

  constructor(private sidenavService: SidenavService,) { }

  ngOnInit() {
  }

  openSidenav(id: string) {
    this.sidenavService.open(id);
  }

  closeSidenav(id: string) {
    this.sidenavService.close(id);
  }
}
