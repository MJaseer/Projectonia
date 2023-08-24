import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Manager } from 'src/app/global/store/space-store';

const url = 'http://localhost:3000/api/admin'

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(private http: HttpClient ) { }

  login({ email, password }: any): Observable<any> {
    const data = { email, password }
    if (email && password) {
      return this.http.post(`${url}/login`, data, { withCredentials: true })
    }
    return throwError(new Error(`Failed to loggin`))
  }

  getUsers(){    
    return this.http.get<Manager[]>(`${url}/home`, { withCredentials: true })
  }

  blockUser(payload:Manager){
    return this.http.patch<Manager>(`${url}/block/${payload._id}`,  payload , { withCredentials: true })
  }

  authenticateAdmin(payLoad: any) {
    return this.http.post(`${url}/getVerified`, payLoad, { withCredentials: true })
  }
}
