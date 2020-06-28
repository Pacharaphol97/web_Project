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
    return this.httpclient.get(firebaseFunction.functionURL +'/getallPersonnel').toPromise();
  }

  createPersonnel(body){
    return this.httpclient.post(firebaseFunction.functionURL +'/createPersonnel',body).toPromise();
  }

  editPersonnel(body){
    return this.httpclient.post(firebaseFunction.functionURL +'/editPersonnel',body).toPromise();
  }

  positiontransfer(body){
    return this.httpclient.post(firebaseFunction.functionURL +'/positionTransfer',body).toPromise();
  }

  teamTransfer(body){
    return this.httpclient.post(firebaseFunction.functionURL +'/teamTransfer',body).toPromise();
  }

  deletePersonnel(body){
    return this.httpclient.post(firebaseFunction.functionURL +'/deletePersonnel',body).toPromise();
  }

  getTimestamp(body){
    return this.httpclient.post(firebaseFunction.functionURL +'/gettimestamp',body).toPromise();
  }

  editTimestamp(body){
    return this.httpclient.post(firebaseFunction.functionURL +'/edittimestamp',body).toPromise();
  }

  getLeave(body){
    return this.httpclient.post(firebaseFunction.functionURL +'/getLeave',body).toPromise();
  }

  getTypeleave(){
    return this.httpclient.get(firebaseFunction.functionURL +'/getTypeleave').toPromise();
  }

  getPublicrelations(){
    return this.httpclient.get(firebaseFunction.functionURL +'/getPublicRelations').toPromise();
  }

  createPublicrelations(body){
    return this.httpclient.post(firebaseFunction.functionURL +'/createPublicRelations',body).toPromise();
  }

  editPublicrelations(body){
    return this.httpclient.post(firebaseFunction.functionURL +'/editPublicRelations',body).toPromise();
  }
}
