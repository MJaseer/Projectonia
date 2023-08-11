import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HelperService } from '../service/helper.service';
import { AdminService } from '../service/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  constructor(private formBuilder: FormBuilder,
    private helper:HelperService,
    private adminService:AdminService,
    private router:Router
    ) { }

    ngOnInit(): void {      
      if(this.adminService.isLoggedIn()){
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
          this.adminService.setToken(result)
          const data = this.adminService.getToken()  
          if(data){
            this.router.navigate(['/admin'])
          }  
        }, (err: any) => {

          console.log(err, 'error');
          this.router.navigate(['/admin/login'])

        })
    }
  }

}
