import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
const httpOptions = {
  headers: new HttpHeaders({
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "multipart/form-data",
  }),
};
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public http: HttpClient) { }
  changePassword(payload: any): Observable<any> {
    return this.http.put(`${environment.baseURL}auth/users/changepassword`, payload)
  }
  logout(userId): Observable<any> {
    return this.http.get(`${environment.baseURL}auth/users/user-logout/${userId}`)
  }
}
