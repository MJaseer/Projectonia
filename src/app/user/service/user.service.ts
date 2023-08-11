import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private http: HttpClient) { }

  isLoading = false

  register({ name, email, password }: any) {
    const data = { name, email, password }
    if (name && email && password) {
      return this.http.post('http://localhost:3000/api/register', data, { withCredentials: true })
    }
    return throwError(new Error('Failed to register'))
  }

  login({ email, password }: any) {
    const data = { email, password }
    if (email && password) {
      return this.http.post('http://localhost:3000/api/login', data, { withCredentials: true })
    }
    return throwError(new Error('Failed to loggin'))
  }

  otpPost(data: any) {
    return this.http.post('http://localhost:3000/api/otpPost', data, { withCredentials: true })
  }

  forgotPassword(email: string) {
    const data = {
      email: email
    }
    return this.http.post('http://localhost:3000/api/forgotPassword', data, { withCredentials: true })
  }

  resetPassword(token: string) {
    return this.http.get(`http://localhost:3000/api/reset?token=${token}`, { withCredentials: true })
  }

  setPassword(passwords: any) {
    return this.http.post(`http://localhost:3000/api/setPassword`, passwords, { withCredentials: true })
  }

}
