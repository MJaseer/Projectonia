import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { AuthService } from '../service/auth.service';
// import jwtDecode, * as JWT from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = this.formBuilder.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', Validators.required],
  })

  isSubmitted = false;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private service: UserService,
    private auth:AuthService
  ) { }

  ngOnInit(): void {    
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['/space'])
    }
  }

  login(): void {
    console.log('login');

    if (this.loginForm.invalid) {

      this.router.navigate(['/login'])

    } else {

      this.service.login(this.loginForm.value).subscribe(
        (result) => {
          console.log(result, 'result',typeof(result));
          this.auth.setToken(result)
          const data = this.auth.getToken()         
          this.router.navigate(['/space'])
        }, (err: any) => {

          console.log(err, 'error');
          this.router.navigate(['/login'])

        })
    }
    

    this.isSubmitted = true
  }

}
