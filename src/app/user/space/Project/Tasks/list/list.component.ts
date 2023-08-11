import { Component, OnInit } from '@angular/core';
import { Project, Task } from '../../../../../global/store/space-store';
import { Store, select } from '@ngrx/store';
import { selectProject, selectTask } from '../../../../../global/store/space.selector';
import { invokeFetchTaskAPI, invokeProjectAPI } from '../../../../../global/store/space.action';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../../../modal/modal.component';
import { TaskService } from '../../../../../global/services/task.service';
import { DatePickerComponent } from '../helper/date-picker/date-picker.component';
import { AssigneeTaskComponent } from '../helper/assignee/assignee.component';
import { PriorityComponent } from '../helper/priority/priority.component';
import { StatusComponent } from '../helper/status/status.component';
import { TaskViewComponent } from 'src/app/shared/modal/task-view/task-view.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})

export class ListComponent implements OnInit {

  constructor(
    private store: Store,
    public modal: MatDialog,
    private taskService: TaskService
  ) { }

  ngOnInit(): void {
    this.store.dispatch(invokeProjectAPI())
    this.project$.subscribe(data => {
      if (data?.length > 0) {
        this.dataFetcher(data)
      }
    })

  }

  readonly = true
  assignees = this.taskService.getAssignee()
  project$ = this.store.pipe(select(selectProject))

  task: Task = {
    title: "Task",
    assigneeId: "01a",
    dueDate: 'Date',
    priority: 'NIL',
    subtask: [{ title: "sub task" }],
    managerId: "01",
    projectId: "01"
  }

  projectId!: any;
  projects!: Project[];

  dataFetcher(data: Project[]) {
    this.projects = data
    this.projectId = data[this.projects.length - 1]._id
    this.invokeTask()
  }


  invokeTask() {
    this.store.dispatch(invokeFetchTaskAPI())
    this.task$.forEach(data => {
      this.taskFetcher(data)
    })
  }

  currentData!: Task[]
  projectTask: any
  taskTitle!: string


  taskFetcher(data: Task[]) {
    this.projectTask = data
    this.taskDivider(data)
  }

  taskDivider(data: Task[]) {
    this.assignees = this.taskService.getAssignee()
    if (data) {
      this.currentData = data.filter((data) => data.projectId == this.projectId)
    }

  }


  task$ = this.store.pipe(select(selectTask))

  changed() {
    const selectedOption = (document.getElementById('underline_select') as HTMLSelectElement).selectedOptions[0];
    const selectedId = selectedOption.value;
    this.projectId = selectedId
    this.taskFetcher(this.projectTask)
  }

  openDelete(id?: string) {
    let deletetask!: Task[];

    if (id) {
      this.task$.forEach(data => {
        deletetask = data.filter((_) => _._id == id)
      })
    }

    if (id) {
      this.modal.open(ModalComponent, {
        width: '440px',
        data: [deletetask, 'task']
      })
    }
  }

  openDrop(item: string, id?: string) {
    let updateTask!: Task[];
    let component: any

    switch (item) {
      case 'date':
        component = DatePickerComponent
        break;
      case 'assignee':
        component = AssigneeTaskComponent
        break;
      case 'priority':
        component = PriorityComponent
        break;
      case 'status':
        component = StatusComponent
        break;
    }

    if (id) {
      this.task$.forEach(data => {
        updateTask = data.filter((_) => _._id == id)
      })

      this.modal.open(component, {
        width: '248x',
        data: [updateTask, 'task']
      })
    }

  }

  editHead(title?: string) {
    if (this.readonly) {
      console.log(title);
      if (title) {
        this.taskTitle = title
      }
      this.readonly = false
    } else {
      this.readonly = true
    }
  }

  saveTask(id?: string) {
    this.readonly = true
    console.log();
    const task = this.currentData.filter((_) => _._id == id)
    console.log(this.taskTitle);
    this.taskService.getUpdate (task,this.taskTitle,'title','user')
  }

  viewTask(task: Task) {
    this.modal.open(TaskViewComponent, {
      width: '90%',
      height: '90%',
      data: [task, this.assignees]
    })
  }

  isHidden = false

}
