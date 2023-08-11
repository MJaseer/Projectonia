import { Component, Inject, OnInit } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Store, select } from '@ngrx/store';
import { Appstate } from 'src/app/shared/store/app-state';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TaskService } from '../../../../../../global/services/task.service';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css'],
  standalone: true,
  imports: [
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
  ]
})

export class DatePickerComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DatePickerComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private taskService: TaskService,
  ) { }

  data: any;

  ngOnInit(): void {
    this.dialogData.forEach((element: any) => {
      this.data = this.dialogData[0]
    });
    
  }

  minDate = new Date(Date.now())

  getDate($event: any, id?: string) {
    const date = $event.target.value
    this.taskService.getUpdate(this.data,date,'date')

    
    this.closeDialog()
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
