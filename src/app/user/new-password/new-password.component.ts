import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent implements OnInit {

  token: any;
  email!: string;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((token) => {
      if (token) {
        this.token = token;
      }
      console.log(this.token);
    })
    this.userService.resetPassword(this.token.token).subscribe(
      (result: any) => {
        console.log(result);
        this.email = result.email
        console.log(this.email);
      }, (err: any) => {
        console.log(err);
        this.router.navigate(['/forgotPassword'])
      }
    )
  }

  resetForm = {
    password: '',
    confirmPassword:'',
    email: ''
  }

  reset() {
    this.resetForm.email =this.email
    console.log(this.resetForm);
    if (this.resetForm.password === this.resetForm.confirmPassword) {
      this.userService.setPassword(this.resetForm).subscribe(
        () => {
          this.router.navigate(['/login'])
        }, (err: any) => {
          console.log(err);
          this.router.navigate(['/forgotPassword'])
        }
      )
    }
  }

}
