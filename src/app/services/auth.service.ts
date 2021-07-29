import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable, BehaviorSubject} from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
    private currentUserSubject: BehaviorSubject<any>;
    public currentUser: Observable<any>;
    private url = environment.base_url;

  constructor(private http: HttpClient, private router: Router) { 
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(data): Observable<any>{
    return this.http.post(`${this.url}/login_check`, data)
    .pipe(map(user => {
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
      console.log(user);
      return user;
    })); 
  }
  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  logout() {
    // remove user from local storage and set current user to null
    // localStorage.removeItem('user');
    // localStorage.removeItem('prenom');
    // localStorage.removeItem('token');
    localStorage.clear();
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }
}
