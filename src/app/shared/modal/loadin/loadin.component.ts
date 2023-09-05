import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user/service/user.service';
import { ErrorComponent } from '../error/error.component';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-loadin',
  templateUrl: './loadin.component.html',
  styleUrls: ['./loadin.component.css']
})
export class LoadinComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<LoadinComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    public modal: MatDialog,
    private userService: UserService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) { }
  email!: string
  forgot = false
  otp = false

  ngOnInit(): void {
    if(this.dialogData[1] == 'forgot'){
      this.email = this.dialogData[0]
      this.forgot = true
      this.spinner.show()
      this.submit()
    }
    if(this.dialogData[1] == 'otp'){
      this.otp = true
      this.spinner.show()
      this.sendOtp(this.dialogData[0])
    }

  }

  submit() {
    this.userService.forgotPassword(this.email)
      .subscribe((result) => {
        console.log(result);
        this.spinner.hide()
        this.dialogueClose()
        this.router.navigate(['/forgotSuccess'])
      }, (err: any) => {
        this.dialogueClose()
        console.log(err.error);
        this.modal.open(ErrorComponent, {
          width: '20%',
          height: '20%',
          data: err.error
        })
      }
      )
  }

  sendOtp(data:any){
    this.userService.register(data).subscribe(
      (result) => {
        console.log(result);
        localStorage.removeItem('userData')
        localStorage.setItem('userData', JSON.stringify(result))
        this.spinner.hide()
        this.dialogueClose()
        this.router.navigate(['/otp'])
      }, (err: any) => {
        Swal.fire('Error','Email is already registered','error')
        console.log(err, 'signup error');
      }
    )
  }

  dialogueClose() {
    this.dialogRef.close()
  }

}
