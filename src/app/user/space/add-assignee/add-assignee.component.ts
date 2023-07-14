import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidatorsService } from '../../../validators.service'
import { SpaceService } from '../services/space.service';

@Component({
  selector: 'app-add-assignee',
  templateUrl: './add-assignee.component.html',
  styleUrls: ['./add-assignee.component.css']
})
export class AddAssigneeComponent {
  [x: string]: any;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private service: SpaceService,
    private customValidator: ValidatorsService,
  ) { }

  isSubmitted = false

  assigneeForm = this.formBuilder.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', Validators.required],
    cpassword: ['', Validators.required],
    fname: ['', Validators.required],
    lname: ['', Validators.required],
    phone: ['', [Validators.required]],
    place: ['', Validators.required],
    post: ['', Validators.required],
    skill: ['', Validators.required]
  })

  add() {
    console.log(this.assigneeForm.getRawValue());
    if (this.assigneeForm.valid) {
      this.service.add(this.assigneeForm.value).subscribe(
        (result) => {
          console.log(result);
        },
        (err:Error) => {
          console.log(err);
        }
      )
    } else {
      console.log(this.assigneeForm.errors, 'error');
      // this.assigneeForm

      // this.router.navigate(['/space/addAssignee'])
    }

    this.isSubmitted = true
  }



}
