import { OthersService } from 'src/app/services/others.service';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-passwordforget-mail',
  templateUrl: './passwordforget-mail.component.html',
  styleUrls: ['./passwordforget-mail.component.scss']
})
export class PasswordforgetMailComponent implements OnInit {

  loginForm: FormGroup;
  successMsg= null;
  errors= null;
  statusLogin;
  constructor(
              private formBuilder: FormBuilder,
              private router: Router,
              private otherService: OthersService) {
    this.getScreenSize();
  }

  scrHeight:any;
  scrWidth:any;

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
        this.scrHeight = window.innerHeight;
        this.scrWidth = window.innerWidth;
        console.log(this.scrHeight, this.scrWidth);
  }
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    }); 
  }
  onSubmit() {
    this.otherService.sendResetPassword(this.loginForm.value).subscribe(
      (result) => {
        this.successMsg = result;
        this.statusLogin = this.successMsg.status;
        if(this.statusLogin == true) {
          this.router.navigate(['passwordforget']);
        }
      }, (error) => {
        this.errors = error.error.message;
      });
  }
}
