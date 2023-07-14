import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpaceService {

  constructor(private http:HttpClient) { }

  add({email,password,fname,lname,phone,place,post,skill}:any):Observable<any>{
    const data = {email,password,fname,lname,phone,place,post,skill}
    return this.http.post('http://localhost:3000/api/addAssignee',data,{withCredentials:true})
  }
}
