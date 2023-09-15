import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { invokeProjectAPI } from '../../../../global/store/space.action';
import { selectProject } from '../../../../global/store/space.selector';
import { Project } from '../interface/project';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../../modal/modal.component';
import { Task } from '../../../../global/store/space-store';
import { ToastrService } from 'ngx-toastr';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-over-view',
  templateUrl: './over-view.component.html',
  styleUrls: ['./over-view.component.css']
})
export class OverViewComponent implements OnInit {

  constructor(
    private toastr: ToastrService,
    private store: Store,
    public modal: MatDialog) { }


  project$ = this.store.pipe(select(selectProject))
  tasks: any[] = []

  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'determinate';
  value = 50;

  ngOnInit(): void {
    this.store.dispatch(invokeProjectAPI())
    this.project$.forEach(data => {
      if (data) {
        this.taskFetcher(data)
      }
    })
  }


  currentData!: Task[]
  projectTask: any[] = []

  taskFetcher(data: Project[]) {
    const projectData = data.map((project) => {
      const totalTasks = project?.tasks?.length;
      const completedCount = project?.tasks?.filter((task) => task.status === "Green").length;
      const todoCount = project?.tasks?.filter((task) => task.status === "Gray").length;
      const progressCount = project?.tasks?.filter((task) => task.status === "Blue").length;
      const dueCount = project?.tasks?.filter((task) => task.status === "Red").length;
      const onDueCount = project?.tasks?.filter((task) => task.status === "Orange").length;
      let completedPercentage = 0
      if(completedCount&& totalTasks){
        completedPercentage = (completedCount / totalTasks) * 100;
      }

      return {
        _id: project._id,
        title:project.title,
        value:completedPercentage,
        tasks: {
          completed: completedCount,
          todo: todoCount,
          progress: progressCount,
          due:dueCount,
          onDue:onDueCount
        },
      };
    });
    
    this.projectTask = projectData
  }

  findCounts(tasks: any[]) {
    
    const taskCounts = new Map<string, number>()
    if (tasks?.length) {
      for (const item of this.tasks.values()) {
        taskCounts.set(item['status'], (taskCounts.get(item['status']) || 0) + 1);
      }
      const taskData = []
      let color = ''
      for (let [status, count] of taskCounts.entries()) {

        switch (status) {
          case 'Blue':
            color = 'INPROGRESS'
            break
          case 'Red':
            color = 'DUE'
            break
          case 'Green':
            color = 'DONE'
            break
          case 'Orange':
            color = 'ONDUE'
            break
          default:
            color = 'TODO'
        }
        taskData.push({ y: count, name: color, color: status })
      }
    }
  }


  deleteProject!: Project[];

  openDelete(id?: string) {
    if (id) {
      this.project$.forEach(data => {
        if (data) {
          this.deleteProject = data.filter((_) => _._id == id)
        }
      })

      this.modal.open(ModalComponent, {
        width: '440px',
        data: [this.deleteProject, 'project']
      })

    }
  }

}
