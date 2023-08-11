import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TaskService } from '../../../../../../global/services/task.service';
import { CommonModule, KeyValue, NgFor } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css'],
  standalone: true,
  imports: [
    NgFor,
    CommonModule,
    MatIconModule,
  ]
})

export class StatusComponent implements OnInit{

  constructor(
    public dialogRef: MatDialogRef<StatusComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private taskService:TaskService
  ) { }

  data:any
  status:any

  ngOnInit(): void {

    this.dialogData.forEach((element: any) => {
      this.data = this.dialogData[0]
    });

    this.status = this.taskService.status
  }


  getStatus(status:string){    
    this.taskService.getUpdate(this.data,status,'status',this.dialogData[2])
    this.closeDialog()
  }

  originalOrder = (a: KeyValue<number,string>, b: KeyValue<number,string>): number => {
    return 0;
  }
  


  closeDialog() {
    this.dialogRef.close();
  }


}
