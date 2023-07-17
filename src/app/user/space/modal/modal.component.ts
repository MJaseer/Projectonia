import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgFor } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { invokeDeleteAssigneeAPI } from '../store/space.action';
import { Appstate } from 'src/app/shared/store/app-state';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { setAPIStatus } from 'src/app/shared/store/app.action';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  standalone: true,
  imports: [
    NgFor
  ]
})

export class ModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private store: Store,
    private appStore: Store<Appstate>
  ) { }

  data:any;

  ngOnInit(): void {
    this.data = this.dialogData;
  }

  delete(id:string) {
    
      this.store.dispatch(
        invokeDeleteAssigneeAPI({ id: id })
      )
      let apiStatus$ = this.appStore.pipe(select(selectAppState))
        apiStatus$.subscribe((apState) => {
          if(apState.apiStatus == 'success') {
            this.dialogRef.close();
            this.appStore.dispatch(
              setAPIStatus({apiStatus:{apiResponseMessage:'',apiStatus:''}})
            )
          }
        })

  }

  closeDialog() {
    this.dialogRef.close();
  }

}
