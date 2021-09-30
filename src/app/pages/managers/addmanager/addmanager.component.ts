import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { ErrormodalService } from 'src/app/modal/_errormodals';

@Component({
  selector: 'app-addmanager',
  templateUrl: './addmanager.component.html',
  styleUrls: ['./addmanager.component.scss']
})
export class AddmanagerComponent implements OnInit {

  show = false;
  matriculeForm: FormGroup;
  userForm: FormGroup;
  datas: any;
  item;
  p = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
  constructor(private dataService: DataService,
    private errormodalService: ErrormodalService,) { }

  ngOnInit() {
    this.datas = this.dataService.getData();
    this.matriculeForm = new FormGroup({
      matricule: new FormControl(''),
    });
    this.userForm = new FormGroup({
      id: new FormControl(''),
    });
  }

  submitted1() {
    const info = {
        matricule: this.matriculeForm.value.matricule,
    } 
    this.show = true;
    return info;
  }
  submitted2() {
    this.show = false;
  }
  openErrorModal(id: string) {
    this.errormodalService.open(id);
  }

  closeErrorModal(id: string) {
    this.errormodalService.close(id);
  }
}
