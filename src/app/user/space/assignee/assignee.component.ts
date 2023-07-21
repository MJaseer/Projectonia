import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { selectAssignee } from '../store/space.selector';
import { invokeAssigneAPI } from '../store/space.action';
import { Assignee } from '../store/space-store';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-assignee',
  templateUrl: './assignee.component.html',
  styleUrls: ['./assignee.component.css']
})

export class AssigneeComponent implements OnInit {

  constructor(private store: Store,
    public modal: MatDialog) { }

  assignee$: Observable<Assignee[]> = this.store.pipe(select(selectAssignee))

  ngOnInit(): void {

    this.store.dispatch(invokeAssigneAPI())
  }

  deleteAssignee!: any

  openDelete(id: string | null | undefined) {

    if (id) {
      this.assignee$.forEach((data) => {
        this.deleteAssignee = data.filter((_) => _._id == id)
      })

      this.modal.open(ModalComponent, {
        width: '440px',
        data: [this.deleteAssignee,'assignee']
      })

    }
  }

}
