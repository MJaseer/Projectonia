import { Component, OnInit } from '@angular/core';
import { HelpersService } from '../services/helpers.service';
import { EmployeeService } from '../services/employee.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private employeeService: EmployeeService,
    private helper: HelpersService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {      
    if(this.employeeService.isLoggedIn()){
      this.router.navigate(['/admin'])
    }
  }

  loginForm = this.formBuilder.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', Validators.required],
  })
  
  login() {
    if(this.loginForm.valid){
      this.helper.login(this.loginForm.value).subscribe(
        (result) => {
          this.employeeService.setToken(result)
          const data = this.employeeService.getToken()  
          if(data){
            this.router.navigate(['/employee'])
          }  
        }, (err: any) => {
          console.log(err, 'error');
          this.router.navigate(['/employee/login'])

        })
    }
  }

}
