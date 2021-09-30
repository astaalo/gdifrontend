import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ModalService } from '../modal/_modal/modal.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService,
        private modalService: ModalService,private router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            const error = (err && err.error && err.error.message) || err.statusText;
            if ([401, 403].includes(err.status) && this.authService.currentUserValue) {
                // auto logout if 401 or 403 response returned from api
                this.authService.logout();
            } 
            console.error(err);
            return throwError(error);
        }))
    }
}