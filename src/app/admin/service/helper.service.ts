import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Manager } from 'src/app/global/store/space-store';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(private http: HttpClient ) { }

  login({ email, password }: any): Observable<any> {
    const data = { email, password }
    if (email && password) {
      return this.http.post('http://localhost:3000/api/admin/login', data, { withCredentials: true })
    }
    return throwError(new Error('Failed to loggin'))
  }

  getUsers(){    
    return this.http.get<Manager[]>('http://localhost:3000/api/admin/home', { withCredentials: true })
  }

  blockUser(payload:Manager){
    return this.http.patch<Manager>(`http://localhost:3000/api/admin/block/${payload._id}`,  payload , { withCredentials: true })
  }
}
