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
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { EmployeeService } from 'src/app/employee/services/employee.service';
import { i_history } from 'src/app/global/user/i_history';
import { Observable, map } from 'rxjs';
import Swal from 'sweetalert2';

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
    FormsModule,
    MatButtonModule,
    MatMenuModule,
    MatListModule,
    MatDividerModule
  ],
})

export class TaskViewComponent implements OnInit {

  readonly = true
  projectHead = ''

  constructor(
    public dialogRef: MatDialogRef<TaskViewComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    public modal: MatDialog,
    private taskService: TaskService,
    private employeeService: EmployeeService
  ) { }

  form = {
    title: '',
    description: ''
  }



  attachments = []
  history!: i_history[]

  data!: Task;

  assignees!: Assignee[]

  disabled = false

  ngOnInit(): void {
    this.projectHead = this.dialogData[3]
    this.data = this.dialogData[0]
    this.assignees = this.dialogData[1]
    console.log('hi',this.dialogData[2] );
    
    if (this.dialogData[2] == 'employee') {
      this.disabled = true
    }

    if (this.data.title) {
      this.form.title = this.data.title
    }
    if (this.data.description) {
      this.form.description = this.data.description
    }

    if (this.data._id) {
      this.taskService.getHistory(this.data._id).subscribe(result => {
        this.history = result

      })
    }

  }

  dialogueClose() {
    console.log('close');
    
    this.dialogRef.close()
  }

  openDelete() {
    if (this.dialogData[2] == 'employee') {
      Swal.fire('Warning', `You can't delete task : ${this.data.title} `, 'warning')
    } else {
      let deletetask = [this.data]

      this.modal.open(ModalComponent, {
        width: '440px',
        data: [deletetask, 'task']
      })
    }

  }

  setAsDone() {

  }

  openDrop(item: string, id?: string) {

    let updateTask = [this.data]
    let component: any
    if (this.dialogData[2] == 'employee' && item != 'status') {
      Swal.fire('Warning', `You can't modify ${item} `, 'warning')
    } else {
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
      if (this.dialogData[2] == 'employee') {
        let user = this.employeeService.getToken()

        this.modal.open(component, {
          width: '248x',
          data: [updateTask, 'task', this.dialogData[2], user._id]
        })
      } else {
        this.modal.open(component, {
          width: '248x',
          data: [updateTask, 'task', this.dialogData[2]]
        })
      }
    }




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
