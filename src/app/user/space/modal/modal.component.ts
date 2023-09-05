import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgFor } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { invokeDeleteAssigneeAPI, invokeDeleteProjectAPI, invokeDeleteTaskAPI } from '../../../global/store/space.action';
import { Appstate } from 'src/app/shared/store/app-state';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { setAPIStatus } from 'src/app/shared/store/app.action';
import { ToastrService } from 'ngx-toastr';

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
    private appStore: Store<Appstate>,
    private toastr:ToastrService
  ) { }

  data: any;
  assigneeId:string|undefined
  managerId:string|undefined

  ngOnInit(): void {

    this.dialogData.forEach((element: any) => {
      this.data = this.dialogData[0]
    });
    if(this.data[0].assigneeId){
      this.assigneeId = this.data[0].assigneeId
    }
    if(this.data[0].managerId){
      this.managerId = this.data[0].managerId
    }

  }
  actionInvoke: any

  delete(id: string) {

    switch (this.dialogData[1]) {
      case 'project':
        this.actionInvoke = invokeDeleteProjectAPI({ id: id })
        break
      case 'assignee':
        this.actionInvoke = invokeDeleteAssigneeAPI({ id: id })
        break
      case 'task':
        this.actionInvoke = invokeDeleteTaskAPI({ id: id })
        break
    }

    if (this.actionInvoke != '') {
      this.store.dispatch(this.actionInvoke)
      let apiStatus$ = this.appStore.pipe(select(selectAppState))
      apiStatus$.subscribe((apState) => {
        if (apState.apiStatus == 'success') {
          this.dialogRef.close()
          this.toastr.success(`${this.dialogData[1]} succesfully deleted`,'Deleted')
          this.appStore.dispatch(
            setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
          )
          this.closeDialog()
        }
      })
    } else {
      console.log(this.dialogData[1]);
    }

  }

  closeDialog() {
    this.dialogRef.close();
  }

}
