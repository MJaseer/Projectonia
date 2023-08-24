import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { invokeAssigneAPI, invokeFetchTaskAPI, invokeProjectAPI, invokeUpdateTaskAPI } from '../store/space.action';
import { selectAssignee, selectProject, selectTask } from '../store/space.selector';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { Appstate } from 'src/app/shared/store/app-state';
import { Router } from '@angular/router';
import { setAPIStatus } from 'src/app/shared/store/app.action';
import { Assignee, Project, Task } from '../store/space-store';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { i_history } from '../user/i_history';

const url = 'http://localhost:3000/api'

@Injectable({
  providedIn: 'root'
})

export class TaskService {

  constructor(
    private store: Store,
    private appStore: Store<Appstate>,
    private router: Router,
    private toastr: ToastrService,
    private http:HttpClient
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

  getHistory(task_id:string){
    return this.http.get<i_history[]>(`${url}/getHistory/${task_id}`, { withCredentials: true })
  }

  tasks!: Task[];
  task: number = 0




  // tasks: any;
  // hi: number = 0


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


  getUpdate(data: any, updatedData: string, item: string, from?: string, modifier?: string) {

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
        if (modifier != undefined) {
          newData = Object.assign({}, data[0], {
            status: updatedData,
            modifier: modifier
          })
        } else {
          newData = Object.assign({}, data[0], {
            status: updatedData,
          })
        }

        break;
      case 'description':
        newData = Object.assign({}, data[0], {
          description: updatedData
        })
        break;
    }
    this.store.dispatch(invokeUpdateTaskAPI({ updateTask: { ...newData } }))
    let apiStatus$ = this.appStore.pipe(select(selectAppState))
    return apiStatus$.subscribe((apState) => {
      if (apState.apiStatus == 'success') {
        if (from == 'employee') {
          this.router.navigate(['/employee/tasks'])
        } else {
          this.router.navigate(['/space/task'],
            { queryParams: { updated: item } }
          )
        }
        this.toastr.success(`${item} succesfully changed`, 'success')
        this.appStore.dispatch(setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } }))
      }
    })
  }
}
