import { Component } from '@angular/core';
import { UserService } from '../service/user.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerForm = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  })

  isSubmitted = false

  constructor(private service: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    private auth:AuthService) { }

  ngOnInit(): void {
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['/space'])
    }
  }

  register(): void {
    if (this.registerForm.invalid) {
      this.router.navigate([''])
    } else {
      this.service.register(this.registerForm.value).subscribe(
        (result) => {          
          this.router.navigate(['login'])
        },(err:any)=>{
          console.log(err,'signup error');
          
        }
      )
    }
    this.isSubmitted = true
  }

}
