import { Injectable } from '@angular/core';
import { firebaseFunction, firebaseConfig } from '../../../environments/firebase.config';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FunctionService {

  constructor(public httpclient: HttpClient) { }

  private authorizationHeader() {
    const token = window.localStorage.getItem('@token');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return headers;
  }

  getPersonnel(){
    return this.httpclient.get(firebaseFunction.functionURL +'/getPersonnel').toPromise();
  }
}
