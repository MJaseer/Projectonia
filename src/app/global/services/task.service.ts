import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { invokeAssigneAPI, invokeFetchTaskAPI, invokeUpdateTaskAPI } from '../store/space.action';
import { selectAssignee, selectTask } from '../store/space.selector';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { Appstate } from 'src/app/shared/store/app-state';
import { Router } from '@angular/router';
import { setAPIStatus } from 'src/app/shared/store/app.action';
import { Assignee, Task } from '../store/space-store';


@Injectable({
  providedIn: 'root'
})

export class TaskService {

  constructor(
    private store: Store,
    private appStore: Store<Appstate>,
    private router: Router
  ) { }

  assignees: any;
  hi: number = 0

  getAssignee() {
    try {
      this.store.dispatch(invokeAssigneAPI());

      this.store.pipe(select(selectAssignee)).subscribe(data => {
        if (data.length > 0 && this.hi == 0) {
          this.hi++;
          this.assignees = data;
          console.log(this.assignees);
          return this.assignees
        }
      });

      if (this.assignees?.length) {
        return this.assignees
      }

    } catch (error) {
      console.log(error);
    }
  }

  tasks!: Task[];
  task: number = 0

  getProject() {
    try {
      this.store.dispatch(invokeFetchTaskAPI());
      this.store.pipe(select(selectTask)).subscribe(data => {
        console.log(data);
        this.tasks = data

        if (data.length > 0 && this.task == 0) {
          this.task++;
          this.tasks = data;
          console.log(this.tasks);
          // return this.tasks
        } else {
          // return this.task
        }
      });

      if (this.tasks?.length > 0) {
        // return this.tasks
      } else {
        // return null
      }
    } catch (error) {
      // return null
    }
  }

  // tasks: any;
  // hi: number = 0

  getTask() {
    let task!: Task[]
    this.store.dispatch(invokeFetchTaskAPI())
    this.store.pipe(select(selectTask)).subscribe((result) => {
      if (result) {
        task = result
      }
    })
    return task

  }

  searchTask(data: Task[], keyword: string) {
    let value = data.filter((_) => _.title == keyword)
    return value
  }

  searchUser(data: any[], keyword: string) {
    let value = data?.filter((_) => { return _?.fname?.includes(keyword) })
    return value
  }

  priority = {
    URGENT: "Red",
    HIGH: "Orange",
    NORMAL: "Blue",
    LOW: "Gray",
  }

  status = {
    TODO: "Gray",
    INPROGRESS: "Blue",
    DUE: "Red",
    DONE: "Green",
    ONDUE: "Orange"
  }


  getUpdate(data: any, updatedData: string, item: string, from?: string) {
    console.log(item);

    let newData: any

    switch (item) {
      case 'title':
        newData = Object.assign({}, data[0], {
          title: updatedData
        })
        break;
      case 'date':
        newData = Object.assign({}, data[0], {
          dueDate: updatedData
        })
        break;
      case 'assignee':
        newData = Object.assign({}, data[0], {
          assigneeId: updatedData
        })
        break;
      case 'priority':
        newData = Object.assign({}, data[0], {
          priority: updatedData
        })
        break;
      case 'status':
        newData = Object.assign({}, data[0], {
          status: updatedData
        })
        break;
      case 'description':
        newData = Object.assign({}, data[0], {
          description: updatedData
        })
        break;
    }
    console.log(newData);
    this.store.dispatch(invokeUpdateTaskAPI({ updateTask: { ...newData } }))
    let apiStatus$ = this.appStore.pipe(select(selectAppState))
    return apiStatus$.subscribe((apState) => {
      if (apState.apiStatus == 'success') {
        if (from == 'employee') {
          this.router.navigate(['/employee/tasks'])
        } else {
          this.router.navigate(['/space/task'])
        }
        this.appStore.dispatch(setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } }))
      }
    })
  }



}
