import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable, BehaviorSubject} from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import * as FileSaver from 'file-saver';

const CSV_EXTENSION = '.csv';
const CSV_TYPE = 'text/plain;charset=utf-8';

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

  /**
   * Saves the file on client's machine via FileSaver library.
   *
   * @param buffer The data that need to be saved.
   * @param fileName File name to save as.
   * @param fileType File type to save as.
   */
  private saveAsFile(buffer: any, fileName: string, fileType: string): void {
    const data: Blob = new Blob([buffer], { type: fileType });
    FileSaver.saveAs(data, fileName);
  }

  /**
   * Creates an array of data to csv. It will automatically generate title row based on object keys.
   *
   * @param rows array of data to be converted to CSV.
   * @param fileName filename to save as.
   * @param columns array of object properties to convert to CSV. If skipped, then all object properties will be used for CSV.
   */
  public exportToCsv(rows: object[], fileName: string, columns?: string[]): string {
    if (!rows || !rows.length) {
      return;
    }
    const separator = ',';
    const keys = Object.keys(rows[0]).filter(k => {
      if (columns.length) {
        return columns.includes(k);
      } else {
        return true;
      }
    });
    const csvContent =
      keys.join(separator) +
      '\n' +
      rows.map(row => {
        return keys.map(k => {
          let cell = row[k] === null || row[k] === undefined ? '' : row[k];
          cell = cell instanceof Date
            ? cell.toLocaleString()
            : cell.toString().replace(/"/g, '""');
          if (cell.search(/("|,|\n)/g) >= 0) {
            cell = `"${cell}"`;
          }
          return cell;
        }).join(separator);
      }).join('\n');
    this.saveAsFile(csvContent, `${fileName}${CSV_EXTENSION}`, CSV_TYPE);
  }
}
