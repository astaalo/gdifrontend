import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService {

  constructor(private authService: AuthService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let currentUser = this.authService.currentUserValue;
    if (currentUser && currentUser.token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.token}`
        }
     });
    }
    return next.handle(req);
  }
}
