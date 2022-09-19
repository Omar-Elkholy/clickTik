import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CoreService {

  apiUrl = environment.apiUrl

  constructor(
    private http: HttpClient
  ) { }

  getRequest<T>(path: string ){
    return this.http.get<T> (`${this.apiUrl}${path}`);
  }
}
