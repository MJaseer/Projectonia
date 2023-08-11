import { Component } from '@angular/core';
import { Project } from '../interface/project';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';
import { Appstate } from 'src/app/shared/store/app-state';
import { invokeCreateProject } from '../../../../global/store/space.action';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { setAPIStatus } from 'src/app/shared/store/app.action';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css']
})

export class NewProjectComponent {

  constructor(
    private router: Router,
    private store: Store,
    private appStore: Store<Appstate>
  ) { }

  project: Project = {
    title: '',
  };

  create() {
    if (this.project) {
      this.store.dispatch(invokeCreateProject({ newProject: this.project }))
      let apiStatus$ = this.appStore.pipe(select(selectAppState));
      apiStatus$.subscribe((apState) => {
        if (apState.apiStatus == 'success') {
          this.appStore.dispatch(
            setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
          )
          this.router.navigate(['/space/project'])
        }
      })
    } else {
      this.router.navigate(['/space/newProject'])
    }

  }

}
