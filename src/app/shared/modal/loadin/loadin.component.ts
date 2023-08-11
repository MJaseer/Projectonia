import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user/service/user.service';
import { ErrorComponent } from '../error/error.component';

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
  ) { }
  email!: string
  ngOnInit(): void {
    this.email = this.dialogData
    if (this.email) {
      this.submit()
    }
  }

  submit() {
    this.userService.forgotPassword(this.email)
      .subscribe((result) => {
        console.log(result);
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

  dialogueClose() {
    this.dialogRef.close()
  }

}
