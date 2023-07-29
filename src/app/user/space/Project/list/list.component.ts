import { Component, OnInit } from '@angular/core';
import { Project, Task } from '../../store/space-store';
import { Store, select } from '@ngrx/store';
import { selectProject, selectTask } from '../../store/space.selector';
import { invokeFetchTaskAPI, invokeProjectAPI } from '../../store/space.action';
import { Appstate } from 'src/app/shared/store/app-state';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DataPickerComponent } from '../Tasks/data-picker/data-picker.component';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})

export class ListComponent implements OnInit {

  constructor(
    private store: Store,
    private appStore: Store<Appstate>,
    private router: Router,
    public modal: MatDialog
  ) { }

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
  tasks!: Task[];

  dataFetcher(data: Project[]) {
    this.projects = data
    this.projectId = data[0]._id
    this.invokeTask()
  }

  currentData!: Task[]
  projectTask: any

  taskFetcher(data: Task[]) {
    this.projectTask = data
    this.taskDivider(data)
  }

  taskDivider(data: Task[]) {
    this.currentData = data.filter((data) => data.projectId == this.projectId)
    console.log(this.currentData);
  }

  ngOnInit(): void {
    this.store.dispatch(invokeProjectAPI())
    this.project$.forEach(data => {
      if (data) {
        this.dataFetcher(data)
      }
    })

    this.task$.forEach(data => {
      this.taskFetcher(data)
    })
  }
  task$ = this.store.pipe(select(selectTask))



  changed() {
    const selectedOption = (document.getElementById('underline_select') as HTMLSelectElement).selectedOptions[0];
    const selectedTitle = selectedOption.textContent;
    const selectedId = selectedOption.value;
    this.projectId = selectedId
    this.taskFetcher(this.projectTask)
  }

  invokeTask() {
    this.store.dispatch(invokeFetchTaskAPI())
  }

  openDelete() {

  }

  openDate(id?: string) {
    console.log(id);
    if (id) {
      this.modal.open(DataPickerComponent, {
        width: '440px',
        data: 'date'
      })
    }
  }

}
