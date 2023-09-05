import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

const url = 'http://localhost:3000/api/assignee'

@Injectable({
  providedIn: 'root'
})
export class HelpersService {

  constructor(private http: HttpClient ) { }

  login({ email, password }: any)  {
    const data = { email, password }    
    if (email && password) {
      return this.http.post(`${url}/login`, data,{ withCredentials: true })
    }
    return throwError(new Error('Failed to loggin'))
  }


}
