import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store, select } from '@ngrx/store';
import { Appstate } from 'src/app/shared/store/app-state';
import { setAPIStatus } from 'src/app/shared/store/app.action';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { invokeDeleteAssigneeAPI } from 'src/app/user/space/store/space.action';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css']
})
export class DeleteModalComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteModalComponent>,
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
