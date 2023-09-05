import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { invokeBlockManager, invokeManagerFecthAPI } from 'src/app/global/store/space.action';
import { selectManager } from 'src/app/global/store/space.selector';
import { Manager } from 'src/app/global/store/space-store';
import { Observable } from 'rxjs';
import { Appstate } from 'src/app/shared/store/app-state';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { setAPIStatus } from 'src/app/shared/store/app.action';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(
    private store: Store,
    private appStore: Store<Appstate>
  ) { }

  users = this.store.pipe(select(selectManager))
  userData!: Manager[]
  storeData!:Manager[]

  getUser(users: Observable<Manager[]>) {
    users.subscribe((data) => {
      this.userData = data
      console.log(this.userData);
      this.storeData = data
      this.userData.slice(0, this.pageSize)
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

  length = 50;
  pageSize = 1;
  pageIndex = 0;
  pageSizeOptions = [1, 5, 10, 25];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  pageEvent!: PageEvent;

  handlePageEvent(e: PageEvent) {
    let size = (e.pageIndex * e.pageSize) + 1
    let start = size - e.pageSize
    this.userData = this.storeData.slice(start, size)
    
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    console.log(setPageSizeOptionsInput);

    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

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
