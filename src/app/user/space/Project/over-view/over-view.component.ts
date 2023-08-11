import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { invokeProjectAPI } from '../../../../global/store/space.action';
import { selectProject } from '../../../../global/store/space.selector';
import { Project } from '../interface/project';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../../modal/modal.component';
import { Task } from '../../../../global/store/space-store';

@Component({
  selector: 'app-over-view',
  templateUrl: './over-view.component.html',
  styleUrls: ['./over-view.component.css']
})
export class OverViewComponent implements OnInit {

  constructor(
    private store: Store,
    public modal: MatDialog) { }


  project$ = this.store.pipe(select(selectProject))
  tasks:any[] =[]



  ngOnInit(): void {
    this.store.dispatch(invokeProjectAPI())
    this.project$.forEach(data => {
      if (data) {
        this.taskFetcher(data)
      }
    })    
  }

  currentData!: Task[]
  projectTask:any

  taskFetcher(data: Project[]) {
    data.forEach((value) => {
      this.tasks.push(value.tasks) 
    })

  }


  deleteProject!: Project[];

  openDelete(id?: string) {
    if (id) {
      this.project$.forEach(data => {
        this.deleteProject = data.filter((_) => _._id == id)
      })

      this.modal.open(ModalComponent, {
        width: '440px',
        data: [this.deleteProject, 'project']
      })

    }
  }

}