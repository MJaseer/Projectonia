import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store, select } from '@ngrx/store';
import { Appstate } from 'src/app/shared/store/app-state';
import { TaskService } from '../../../../../../global/services/task.service';
import { Observable } from 'rxjs';
import { Assignee, Task } from 'src/app/global/store/space-store';
import { CommonModule, KeyValue, NgFor } from '@angular/common';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { invokeUpdateTaskAPI } from 'src/app/global/store/space.action';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { setAPIStatus } from 'src/app/shared/store/app.action';
import { Router } from '@angular/router';


@Component({
  selector: 'app-priority',
  templateUrl: './priority.component.html',
  styleUrls: ['./priority.component.css'],
  standalone: true,
  imports: [
    NgFor,
    CommonModule,
    MatIconModule,
  ]
})

export class PriorityComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<PriorityComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private taskService: TaskService,
  ) { }

  data!: any;
  priority: any

  ngOnInit(): void {

    this.dialogData.forEach((element: any) => {
      this.data = this.dialogData[0]
    });
    this.priority = this.taskService.priority
  }

  getPriorities(priority:string){
    
    this.taskService.getUpdate(this.data,priority,'priority')
    this.closeDialog()
  }

  originalOrder = (a: KeyValue<number, string>, b: KeyValue<number, string>): number => {
    return 0;
  }



  closeDialog() {
    this.dialogRef.close();
  }

}
