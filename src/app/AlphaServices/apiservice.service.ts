import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  constructor(private http:HttpClient) {

  }

  // Connect Front-end to back-end
  apiUrl = 'http://localhost:3000/user';

  // Get all data
  getAllData():Observable<any>{
    return this.http.get(this.apiUrl)
  }

}
