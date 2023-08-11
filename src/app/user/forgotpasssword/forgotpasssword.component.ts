import { Component } from '@angular/core';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LoadinComponent } from 'src/app/shared/modal/loadin/loadin.component';

@Component({
  selector: 'app-forgotpasssword',
  templateUrl: './forgotpasssword.component.html',
  styleUrls: ['./forgotpasssword.component.css']
})
export class ForgotpassswordComponent {

  constructor(
    public modal: MatDialog,
  ) { }
  form ={
    email: ''
  }

  submit() {
    this.modal.open(LoadinComponent, {
      width: '20%',
      height: '20%',
      data: this.form.email
    })
  
  }
  
}
