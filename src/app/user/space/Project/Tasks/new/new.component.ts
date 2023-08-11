import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Appstate } from 'src/app/shared/store/app-state';
import { Router } from '@angular/router';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { setAPIStatus } from 'src/app/shared/store/app.action';
import { Task } from 'src/app/global/store/space-store';
import { invokeCreateTaskAPI } from 'src/app/global/store/space.action';
// import { MatIconModule } from '@angular/material/icon';
// import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css'],
})

export class NewComponent {

  constructor(
    private store: Store,
    private appStore: Store<Appstate>,
    private router: Router,
  ) { }

  task: Task = {
    title: "",
  }

  createTask() {
    const selectedOption = (document.getElementById('underline_select') as HTMLSelectElement).selectedOptions[0];
    const selectedTitle = selectedOption.textContent;
    const selectedId = selectedOption.value;
    
    if (this.task.title !== '') {
      this.task.projectId = selectedId
      this.invokeTask()
    } else {
      this.router.navigate(['/space/task'])
    }
  }

  invokeTask() {
    this.store.dispatch(invokeCreateTaskAPI({ newTask: this.task }))
    let apiStatus$ = this.appStore.pipe(select(selectAppState))
    apiStatus$.subscribe((apState) => {  
      if (apState.apiStatus == 'success') {
        this.router.navigate(['/space/task'])
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        )
      } else {
        this.router.navigate(['/space/task'])
      }
    })
  }

  close() {
    this.router.navigate(['/space/task'])
  }

}
