import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

@Injectable()
export class HttpService {

  private baseUrl = environment.baseURL;
  constructor(private httpClient: HttpClient) {
  }

  get(url: string, params?: any): Observable<any> {
    return this.httpClient.get(this.baseUrl + url);
  }
  post(url:string,params?:any):Observable<any>{
    return this.httpClient.post(this.baseUrl + url,params);

  }
}
