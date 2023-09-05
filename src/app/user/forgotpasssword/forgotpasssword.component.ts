import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoadinComponent } from 'src/app/shared/modal/loadin/loadin.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgotpasssword',
  templateUrl: './forgotpasssword.component.html',
  styleUrls: ['./forgotpasssword.component.css']
})
export class ForgotpassswordComponent {

  constructor(public modal: MatDialog) { }
  form = {
    email: ''
  }

  submit() {
    if(this.form.email != ''){
      this.modal.open(LoadinComponent, {
        data: [this.form.email, 'forgot']
      })
    }
    
  }

}
