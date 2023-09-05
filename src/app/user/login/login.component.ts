import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { AuthService } from '../service/auth.service';
import Swal from 'sweetalert2';

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

    if (this.loginForm.invalid) {

      this.router.navigate(['/login'])

    } else {

      this.service.login(this.loginForm.value).subscribe(
        (result) => {
          this.auth.setToken(result)
          const data = this.auth.getToken()         
          this.router.navigate(['/space'])
        }, (err: any) => {
          switch(err.error){
            case 'Password is incorrect':
              Swal.fire('Error','Password is incorrect','error');
              break;
            case 'User not found':
              Swal.fire('Error','User not found','error')
              break;
            case "This user is blocked":
              Swal.fire('Error',"This user is blocked",'error')
          }
          console.log(err, 'error');
          this.router.navigate(['/login'])

        })
    }
    

    this.isSubmitted = true
  }

}
