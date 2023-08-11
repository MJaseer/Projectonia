import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { HelpersService } from '../services/helpers.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  constructor(private employeeService: EmployeeService,
    private helper:HelpersService,
    private router: Router) { }

    ngOnInit(): void {
      if (!this.employeeService.isLoggedIn()) {
        this.router.navigate(['/admin/login'])
      }
    }

}
