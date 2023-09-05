import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private router: Router) { }

  clean() {
    return localStorage.clear()
  }

  setToken(data: any) {
    localStorage.removeItem('admin')
    return localStorage.setItem('admin', JSON.stringify(data))
  }

  getToken() {
    const data = localStorage.getItem('admin');
    if (data) {
      return JSON.parse(data)
    }
    return null
  }

  deleteToken() {
    localStorage.removeItem('admin')
    this.router.navigate(['/'])
  }

  isLoggedIn() {    
    return this.getToken() !== null
  }
}
