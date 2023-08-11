import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store, select } from '@ngrx/store';
import { Appstate } from 'src/app/shared/store/app-state';
import { TaskService } from '../../../../../../global/services/task.service';
import { Observable } from 'rxjs';
import { Assignee } from 'src/app/global/store/space-store';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-assignee',
  templateUrl: './assignee.component.html',
  styleUrls: ['./assignee.component.css'],
  standalone: true,
  imports: [
    NgFor,
    FormsModule
  ]
})

export class AssigneeTaskComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AssigneeTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private taskService:TaskService
  ) { }

  data: any;
  // assignee$!: Observable<Assignee[]>; 
  assignees!:any;

  // dataFetcher(data:Assignee[]){
  //   this.assignees = data
  // }
  
  ngOnInit(): void {

    this.dialogData.forEach((element: any) => {
      this.data = this.dialogData[0]
    });
    this.assignees = this.taskService.getAssignee()
    
    // this.assignee$.forEach(data => {
    //   this.dataFetcher(data)
    // })

  }

  search(){
    const value = this.searchKey;
    this.ngOnInit()
    this.assignees = this.taskService.searchUser(this.assignees,value)
  }

  searchKey!:string;

  getAssignee(id:string){    
    this.taskService.getUpdate(this.data,id,'assignee')
    this.closeDialog()
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
