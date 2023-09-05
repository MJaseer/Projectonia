import { Component } from '@angular/core';
import { UserService } from '../service/user.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { LoadinComponent } from 'src/app/shared/modal/loadin/loadin.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerForm = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    cpassword: ['', Validators.required]
  })

  isSubmitted = false

  constructor(private service: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    private auth: AuthService,
    public modal: MatDialog) { }

  ngOnInit(): void {
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['/space'])
    }
  }

  register(): void {
    if (this.registerForm.invalid) {
      this.router.navigate(['/register'])
    } else {
      if (this.registerForm.value.name?.trim() != '' && this.registerForm.value.password != '') {
        this.modal.open(LoadinComponent, {
          data: [this.registerForm.value, 'otp']
        })

        
      } else {
        Swal.fire('Error','Every input must incude letters','warning')
      }
    }
    this.isSubmitted = true
  }

}
