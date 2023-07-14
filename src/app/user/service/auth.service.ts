import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// import jwtDecode, * as JWT from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor( private router:Router) { }
  
  token!: string | null;
  data = ''

  clean() {
    return localStorage.clear()
  }

  setToken(data: any) {
    return localStorage.setItem('data', JSON.stringify(data))
  }

  getToken() {
    const data = localStorage.getItem('data');
    if (data) {
      return JSON.parse(data)
    }
    return null
  }

  deleteToken() {
    localStorage.removeItem('data')
    this.router.navigate(['/'])
  }

  isLoggedIn() {
    return this.getToken() !== null
  }

}
