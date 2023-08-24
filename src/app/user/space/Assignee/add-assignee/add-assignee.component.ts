import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { ValidatorsService } from '../../../validators.service'
import { Store, select } from '@ngrx/store';
import { invokeAddAssigneAPI } from '../../../../global/store/space.action';
import { Appstate } from 'src/app/shared/store/app-state';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { setAPIStatus } from 'src/app/shared/store/app.action';
import { Assignee } from '../../../../global/store/space-store';
import { SpaceService } from '../../../../global/services/space.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-assignee',
  templateUrl: './add-assignee.component.html',
  styleUrls: ['./add-assignee.component.css']
})
export class AddAssigneeComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
    private store: Store,
    private appStore: Store<Appstate>,
    private router: Router,
    private service: SpaceService,
    private toastr:ToastrService
    // private customValidator: ValidatorsService,
  ) { }


  assigne !: Assignee;

  ngOnInit(): void {

  }

  assigneeForm = this.formBuilder.group({
    _id: [''],
    fname: ['', Validators.required],
    lname: ['', Validators.required],
    email: ['', [Validators.email, Validators.required]],
    password: ['', Validators.required],
    cpassword:[''],
    phone: [null, Validators.required],
    place: ['', Validators.required],
    post: ['', Validators.required],
    skill: ['', Validators.required],
    timeStamp: [''],
    __v: [null],
  })

  isSubmitted = false

  add() {

    const formValues = this.assigneeForm.value;

    this.assigne = {
      _id: formValues._id,
      fname: formValues.fname,
      lname: formValues.lname,
      email: formValues.email,
      password: formValues.password,
      phone: formValues.phone,
      place: formValues.place,
      post: formValues.post,
      skill: formValues.skill,
      timeStamp: formValues.timeStamp,
      __v: formValues.__v,
    };

    if (this.assigneeForm.valid) {
      if(this.assigneeForm.value.cpassword == this.assigneeForm.value.password) {
        this.store.dispatch(invokeAddAssigneAPI({ newAssignee: this.assigne }))
        let apiStatus$ = this.appStore.pipe(select(selectAppState))
        apiStatus$.subscribe((apState) => {
          this.router.navigate(['/space/assignee'])
          if (apState.apiStatus == 'success') {
            this.appStore.dispatch(
              setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
            )
          }
        })
      } else {
        this.toastr.error('Confirm password must be same as password','Password Error')
      }
    } else {
      console.log(this.assigneeForm, 'error');
      this.router.navigate(['/space/addAssignee'])
    }

    this.isSubmitted = true
  }



}
