import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  dataLogin;
  errorMsg: string;
  statusLogin;
  scrHeight:any;
  scrWidth:any;
  loading: boolean;
  constructor(private route: Router,
              private auth: AuthService) {
                this.getScreenSize()
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
        this.scrHeight = window.innerHeight;
        this.scrWidth = window.innerWidth;
  }
  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl (''),
      password: new FormControl('')
    });
  }
  
  onSubmit() {
    this.loading = true;
    this.auth.login(this.loginForm.value).subscribe(
      data => {
        this.dataLogin = data;
        console.log(data);
        this.statusLogin = this.dataLogin.status;
        if(this.statusLogin == true) {
          let profil = data.data.profil
          let prenom = data.data.prenom
          localStorage.setItem('token', data.token)
          localStorage.setItem('user', profil)
          localStorage.setItem('prenom', prenom);
          this.route.navigate(['accueil/home']);
        } else {
          this.loading == false;
        }

      }, error => {
        this.errorMsg = 'Login ou Password incorrect';
        console.log(error);
      }
    )
  }
}

