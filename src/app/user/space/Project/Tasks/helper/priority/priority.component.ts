import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TaskService } from '../../../../../../global/services/task.service';
import { CommonModule, KeyValue, NgFor } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';



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
