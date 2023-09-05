import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';import { Project, Task } from 'src/app/global/store/space-store';
import { Store, select } from '@ngrx/store';
import { selectProject, selectTask } from 'src/app/global/store/space.selector';
import { invokeFetchTaskAPI, invokeProjectAPI } from 'src/app/global/store/space.action';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { StatusComponent } from 'src/app/user/space/Project/Tasks/helper/status/status.component';
import { TaskViewComponent } from 'src/app/shared/modal/task-view/task-view.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  projectTask!: Task[];
  assignees: any;
  currentData!: Task[];

  constructor(
    private employeeService: EmployeeService,
    private store: Store,
    public modal: MatDialog,
  ) { }

  projectId: any;
  availableProject: any[] = []
  projectHead = ''

  employeeId: any
  projects!: any[]
  tasks!: Task[];
  tasks$!: Observable<Task[]>;
  assignedTask!: Task[];

  ngOnInit(): void {
    this.store.dispatch(invokeFetchTaskAPI());
    this.store.dispatch(invokeProjectAPI())
    this.fetchProject()    
  }

  fetchTask() {
    let task = 0
    this.tasks$ = this.store.pipe(select(selectTask))
    this.tasks$.subscribe(data => {
      this.tasks = data
      if (data.length > 0 && task == 0) {
        task++;
        this.tasks = data;
        this.fetchAssignable(data)
      }
    })
  }

  fetchProject() {
    let project = 0
    this.store.pipe(select(selectProject)).subscribe(
      (data) => {
        this.tasks = data
        if (data?.length > 0 && project == 0) {
          project++;
          this.projects = data;
          this.fetchTask()

        }
      }
    )

  }


  fetchAssignable(data: Task[]) {
    this.employeeId = this.employeeService.getToken()
    this.assignedTask = data.filter((_) => _.assigneeId == this.employeeId._id)
    this.assignedTask?.forEach((tasks) => {
      this.projects.forEach((values) => {
        if (tasks.projectId == values._id) {
          this.availableProject.push(values)
        }
      })
    })
    const uniqueArr = this.availableProject.reduce((accumulator, item) => {
      if (!accumulator.includes(item)) {
        accumulator.push(item);
      }
      return accumulator;
    }, []);
    this.availableProject = uniqueArr
    this.taskFetcher(this.assignedTask)
  }

  openDrop(item: string, id?: string) {

    let updateTask!: Task[];
    const user = this.employeeService.getToken()

    if (id) {
      this.tasks$.forEach(data => {
        updateTask = data.filter((_) => _._id == id)
      })
      this.modal.open(StatusComponent, {
        width: '248x',
        data: [updateTask, 'task', 'employee',user._id]
      })
    }
  }

  taskFetcher(data: Task[]) {
    this.projectTask = data
    this.taskDivider(data)
  }

  taskDivider(data: Task[]) {
    if (data) {
      this.assignedTask = data.filter((data) => data.projectId == this.projectId)
    } if(this.projectId == undefined) {
      this.assignedTask = data      
    }

  }
  readonly = true

  viewTask(task: Task) {
    this.modal.open(TaskViewComponent, {
      width: '90%',
      height: '90%',
      data: [task, this.assignees,'employee',this.projectHead]
    })
  }


  changed(event: any) {
    this.projectId = event
    const project = this.availableProject.find(_ => _._id == this.projectId)
    this.projectHead = project?.title
    this.taskFetcher(this.projectTask)
  }
}
