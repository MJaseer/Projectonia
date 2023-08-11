import { Component, OnInit } from '@angular/core';
import { HelperService } from '../service/helper.service';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { invokeBlockManager, invokeManagerFecthAPI } from 'src/app/global/store/space.action';
import { selectManager } from 'src/app/global/store/space.selector';
import { Manager } from 'src/app/global/store/space-store';
import { Observable } from 'rxjs';
import { Appstate } from 'src/app/shared/store/app-state';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { setAPIStatus } from 'src/app/shared/store/app.action';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(
    private store: Store,
    private router: Router,
    private appStore: Store<Appstate>
  ) { }

  users = this.store.pipe(select(selectManager))
  userData!: Manager[]

  getUser(users: Observable<Manager[]>) {
    users.subscribe((data) => {
      this.userData = data
    })
  }

  getUserById(id?: string) {
    const user = this.userData.find((_) => _?._id == id)
    if (user) {
      return user
    }
    return null
  }

  ngOnInit(): void {
    this.store.dispatch(invokeManagerFecthAPI())
    this.getUser(this.users)
  }
  newUser!: Manager;

  blocker(value: string, userId?: string) {
    const user = this.getUserById(userId)
    console.log(user);
    
    if (user) {
      if (value == 'Block') {
        console.log('hi');
        this.newUser = {
          ...user,
          status: 'UnBlock'
        }
      } else {
        console.log('hgelo');
        this.newUser = {
          ...user,
          status: 'Block'
        }
      }
      console.log(this.newUser);


      this.store.dispatch(invokeBlockManager({ blockManager: { ...this.newUser } }))

      let apiStatus$ = this.appStore.pipe(select(selectAppState))
      apiStatus$.subscribe((apState) => {
        if (apState.apiStatus == 'success') {
          this.appStore.dispatch(
            setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
          )
        }
      })

    }

  }

}
