import { Component, OnInit } from '@angular/core';
import { faSquare } from '@fortawesome/free-regular-svg-icons';
import { Task } from '../../store/space-store';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent implements OnInit {

  square = faSquare

  task:Task = {
    title:'',
    assignee:'',
    dueDate:'',
    priority:'',
    subtask:[]
  }

  ngOnInit(): void {
    
  }


  openDelete(){
    
  }

}
