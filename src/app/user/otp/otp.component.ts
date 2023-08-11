import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent implements OnInit {

  constructor(private service: UserService,
    private router: Router,
  ) { }

  userData: any

  ngOnInit() {
    const data = localStorage.getItem('userData')
    if (data) {
      this.userData = JSON.parse(data)
    }
  }

  otp!: string;
  inputDigitLeft: string = "Verify code";
  btnStatus: string = "btn-light";

  public configOptions = {
    length: 6,
    inputClass: 'digit-otp',
    containerClass: 'flex justify-between'
  }

  onOtpChange(event: any) {
    this.otp = event;
    if (this.otp.length < this.configOptions.length) {
      this.inputDigitLeft = this.configOptions.length - this.otp.length + " digits Left";
      this.btnStatus = 'btn-light';
    }

    if (this.otp.length == this.configOptions.length) {
      this.inputDigitLeft = "Let's go!";
      this.btnStatus = 'btn-primary';

      this.otpValidater()
    }
  }

  otpValidater() {
    const value = this.otp
    this.userData.otp = value
    this.service.otpPost(this.userData).subscribe(
      (result) => {
        localStorage.removeItem('userData')
        console.log(result);
        this.router.navigate(['/login'])
      }, (err: any) => {
        console.log(err);

      }
    )
  }


}
