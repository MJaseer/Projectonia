import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

const url = 'http://localhost:3000/api'


@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private http: HttpClient) { }

  isLoading = false

  register({ name, email, password }: any) {
    const data = { name, email, password }
    if (name && email && password) {
      return this.http.post(`${url}/register`, data, { withCredentials: true })
    }
    return throwError(new Error('Failed to register'))
  }

  login({ email, password }: any) {
    const data = { email, password }
    if (email && password) {
      return this.http.post(`${url}/login`, data, { withCredentials: true })
    }
    return throwError(new Error('Failed to loggin'))
  }

  otpPost(data: any) {
    return this.http.post(`${url}/otpPost`, data, { withCredentials: true })
  }

  forgotPassword(email: string) {
    const data = {
      email: email
    }
    return this.http.post(`${url}/forgotPassword`, data, { withCredentials: true })
  }

  resetPassword(token: string) {
    return this.http.get(`${url}/reset?token=${token}`, { withCredentials: true })
  }

  setPassword(passwords: any) {
    return this.http.post(`${url}/setPassword`, passwords, { withCredentials: true })
  }

  authenticateUser(payLoad: any) {
    return this.http.post(`${url}/getVerified`, payLoad, { withCredentials: true })
  }

}
