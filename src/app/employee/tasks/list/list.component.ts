import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { HelpersService } from '../../services/helpers.service';
import { TaskService } from 'src/app/global/services/task.service';
import { Task } from 'src/app/global/store/space-store';
import { Store, select } from '@ngrx/store';
import { selectTask } from 'src/app/global/store/space.selector';
import { invokeFetchTaskAPI } from 'src/app/global/store/space.action';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { StatusComponent } from 'src/app/user/space/Project/Tasks/helper/status/status.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(
    private employeeService: EmployeeService,
    private helper: HelpersService,
    private router: Router,
    private taskservice: TaskService,
    private store: Store,
    public modal: MatDialog,
  ) { }

  employeeId: any
  projects!: any[]
  tasks!: Task[];
  tasks$!: Observable<Task[]>;
  assignedTask!: Task[];

  ngOnInit(): void {
    this.store.dispatch(invokeFetchTaskAPI());
    this.fetchTask()
  }

  fetchTask() {
    this.tasks$ = this.store.pipe(select(selectTask))
    this.tasks$.subscribe(data => {
      this.tasks = data

      if (data.length > 0 && this.task == 0) {
        this.task++;
        this.tasks = data;
        console.log(this.tasks);
        this.fetchAssignable(data)
      }
    })
  }

  fetchAssignable(data: Task[]) {
    this.employeeId = this.employeeService.getToken()
    this.assignedTask = data.filter((_) => _.assigneeId == this.employeeId.employeeId)
  }

  openDrop(item: string, id?: string) {
    let updateTask!: Task[];
    if (id) {
      this.tasks$.forEach(data => {
        updateTask = data.filter((_) => _._id == id)
      })

      this.modal.open(StatusComponent, {
        width: '248x',
        data: [updateTask, 'task','employee']
      })
    }
  }

  task: number = 0



  changed() {

  }
}
