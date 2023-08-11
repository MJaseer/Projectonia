import { Component, EventEmitter, Inject, Input, OnChanges, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Assignee, Task } from 'src/app/global/store/space-store';
import { StatusPipe } from 'src/app/pipes/status.pipe';
import { MonthAndDatePipe } from 'src/app/pipes/month.pipe';
import { AssigneePipe } from 'src/app/pipes/assignee.pipe';
import { TaskService } from 'src/app/global/services/task.service';
import { ModalComponent } from 'src/app/user/space/modal/modal.component';
import { DatePickerComponent } from 'src/app/user/space/Project/Tasks/helper/date-picker/date-picker.component';
import { AssigneeTaskComponent } from 'src/app/user/space/Project/Tasks/helper/assignee/assignee.component';
import { PriorityComponent } from 'src/app/user/space/Project/Tasks/helper/priority/priority.component';
import { StatusComponent } from 'src/app/user/space/Project/Tasks/helper/status/status.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    StatusPipe,
    MonthAndDatePipe,
    AssigneePipe,
    FormsModule
  ],
})

export class TaskViewComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<TaskViewComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    public modal: MatDialog,
    private taskService: TaskService
  ) { }

  form = {
    title: '',
    description: ''
  }

  data!: Task;

  assignees!: Assignee[]

  ngOnInit(): void {
    this.data = this.dialogData[0]
    this.assignees = this.dialogData[1]
    if(this.data.title){
      this.form.title = this.data.title
    }
    if(this.data.description){
      this.form.description = this.data.description
    }    
  }

  dialogueClose() {
    this.dialogRef.close()
  }

  openDelete() {
    let deletetask = [this.data]

    this.modal.open(ModalComponent, {
      width: '440px',
      data: [deletetask, 'task']
    })

  }

  openDrop(item: string, id?: string) {
    let updateTask = [this.data]
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
    this.modal.open(component, {
      width: '248x',
      data: [updateTask, 'task']
    })
  }

  saveTitle() {
    if (this.form.title) {
      this.taskService.getUpdate([this.data], this.form.title, 'title', 'user')
    }
  }

  saveDescription() {    
    if (this.form.description) {
      this.taskService.getUpdate([this.data], this.form.description, 'description', 'user')
    }
  }

}
