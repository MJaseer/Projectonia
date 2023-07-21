import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgFor } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { invokeDeleteAssigneeAPI, invokeDeleteProjectAPI } from '../store/space.action';
import { Appstate } from 'src/app/shared/store/app-state';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { setAPIStatus } from 'src/app/shared/store/app.action';
import { Project } from '../store/space-store';


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

  data: any;

  ngOnInit(): void {

    this.dialogData.forEach((element: any) => {
      this.data = this.dialogData[0]
    });
  }

  delete(id: string) {
    if (this.dialogData[1] == 'project') {
      console.log(id, 'pro');

      this.store.dispatch(invokeDeleteProjectAPI({ id: id }))
      let apiStatus$ = this.appStore.pipe(select(selectAppState))
      apiStatus$.subscribe((apState) => {
        if(apState.apiStatus == 'success') {
          this.dialogRef.close()
          this.appStore.dispatch(
            setAPIStatus({apiStatus:{apiResponseMessage:'',apiStatus:''}})
          )
          this.closeDialog()
        }
      })

    } else if (this.dialogData[1] == 'assignee') {
      console.log(id, 'ass');

      this.store.dispatch(invokeDeleteAssigneeAPI({ id: id }))
      let apiStatus$ = this.appStore.pipe(select(selectAppState))
      apiStatus$.subscribe((apState) => {
        debugger

        if (apState.apiStatus == 'success') {
          debugger

          this.appStore.dispatch(
            setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
          )
          this.closeDialog()
        }
      })
    }
  }


  closeDialog() {
    this.dialogRef.close();
  }

}
