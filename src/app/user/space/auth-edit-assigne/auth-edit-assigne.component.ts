import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { switchMap } from 'rxjs';
import { Appstate } from 'src/app/shared/store/app-state';
import { selectAssigneeById } from '../store/space.selector';
import { setAPIStatus } from 'src/app/shared/store/app.action';
import { invokeUpdateAssigneeAPI } from '../store/space.action';
import { Assignee } from '../store/space-store';
import { selectAppState } from 'src/app/shared/store/app.selector';

@Component({
  selector: 'app-auth-edit-assigne',
  templateUrl: './auth-edit-assigne.component.html',
  styleUrls: ['./auth-edit-assigne.component.css']
})

export class AuthEditAssigneComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private store: Store,
    private appStore: Store<Appstate>,
    private route: ActivatedRoute
  ) { }

  isSubmitted = false;

  assigneeForm: Assignee = {
    _id: '',
    fname: '',
    lname: '',
    email: '',
    password: '',
    phone: null,
    place: '',
    post: '',
    skill: '',
    timeStamp: '',
    __v: null
  }

  ngOnInit(): void {

    let fetchData$ = this.route.paramMap.pipe(
      switchMap((params) => {
        let id = params.get('id')
        return this.store.pipe(select(selectAssigneeById(id)))
      })
    )

    fetchData$.subscribe((data) => {
      if (data) {
        const values = {...data}   
        this.assigneeForm = values
      } else {
        this.router.navigate(['/space/assignee'])
      }
    })
  }

  update() {
    this.store.dispatch(
      invokeUpdateAssigneeAPI({ updateAssigne: { ...this.assigneeForm } })
    );
    let apiStatus$ = this.appStore.pipe(select(selectAppState))
    apiStatus$.subscribe((apState) => {
      if (apState.apiStatus == 'success') {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        )
        this.router.navigate(['/space/assignee'])
      }
    })
  }
}
