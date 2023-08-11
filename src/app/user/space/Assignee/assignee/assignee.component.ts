import { Component, HostListener, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { selectAssignee } from '../../../../global/store/space.selector';
import { invokeAssigneAPI } from '../../../../global/store/space.action';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../../modal/modal.component';


@Component({
  selector: 'app-assignee',
  templateUrl: './assignee.component.html',
  styleUrls: ['./assignee.component.css']
})

export class AssigneeComponent implements OnInit {

  constructor(private store: Store,
    public modal: MatDialog) { }

  isOpen = {
    open:false,
    id:''
  }

  openAssigne(id?:string|null){
    if(this.isOpen.open){
      this.isOpen.open = false
    } else {
      this.isOpen.open = true
    }
    if(id){
      this.isOpen.id = id
    }
  }

  // isOpen = false;

  assignee$ = this.store.pipe(select(selectAssignee))

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
        data: [this.deleteAssignee, 'assignee']
      })

    }
    this.openAssigne()
  }
}
