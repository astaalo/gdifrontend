import { DataService } from './../../service/data.service';
import { Component, HostListener, OnInit } from '@angular/core';
import { NgxFileSaverService } from '@clemox/ngx-file-saver';
import { ModalService } from 'src/app/_modal/modal.service';
import { ActivatedRoute } from '@angular/router';
import {OthersService} from '../../services/others.service';


@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss']
})
export class ManagerComponent implements OnInit {
  scrHeight:any;
  scrWidth:any;
  viewer = 'google';   
  DemoDoc="http://www.africau.edu/images/default/sample.pdf" 
  DemoDoc1="https://file-examples.com/wp-content/uploads/2017/02/file-sample_100kB.doc"
  DemoDoc2="https://www.le.ac.uk/oerresources/bdra/html/resources/example.txt" 
  filterterm: string;
  datas: any;
  showHome = true;
  user;
  item;
  data;
  managerinfo;
  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
        this.scrHeight = window.innerHeight;
        this.scrWidth = window.innerWidth;
        console.log(this.scrHeight, this.scrWidth);
  }
  constructor(private dataService: DataService,
    private modalService: ModalService,
    private fileSaver: NgxFileSaverService,
    private otherService: OthersService,
    private activeroute: ActivatedRoute) {
      this.getScreenSize();
      this.activeroute.queryParams.subscribe(params => {
        this.item = JSON.parse(params["user"]);
        console.log(this.item);
        
        this.otherService.getDetailsManagerById(this.item).subscribe(
          result => {
            this.data = result
            this.managerinfo = this.data.data
            console.log(this.data);
            
          }
        )
      })
    }

  ngOnInit() {
    this.user = localStorage.getItem('user');
    if(this.user == 'inter') {
      this.showHome = false;
    } else {
      this.showHome = true;
    }
     this.datas = this.dataService.getData();
     
     
     
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }
  public getfilemodal() {
    this.fileSaver.saveUrl(this.DemoDoc, 'contrat');
  }

}
