import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { selectAssignee } from '../store/space.selector';
import { invokeAssigneAPI } from '../store/space.action';
import { Assignee } from '../store/space-store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-assignee',
  templateUrl: './assignee.component.html',
  styleUrls: ['./assignee.component.css']
})

export class AssigneeComponent implements OnInit {

  constructor( private store: Store ) { }

  assignee$: Observable<Assignee[]> = this.store.pipe(select(selectAssignee))
  
  ngOnInit(): void {
  
    this.store.dispatch(invokeAssigneAPI())
    
  }

}
