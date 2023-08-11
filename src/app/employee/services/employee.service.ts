import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private router: Router) { }

  clean() {
    return localStorage.clear()
  }

  setToken(data: any) {
    return localStorage.setItem('employee', JSON.stringify(data))
  }

  getToken() {
    const data = localStorage.getItem('employee');
    if (data) {
      return JSON.parse(data)
    }
    return null
  }

  deleteToken() {
    localStorage.removeItem('employee')
    this.router.navigate(['/'])
  }

  isLoggedIn() {
    return this.getToken() !== null
  }
}
