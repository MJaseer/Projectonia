import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

const url = `${environment.backendPort}/api/assignee`

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
