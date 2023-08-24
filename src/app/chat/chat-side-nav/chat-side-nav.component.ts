import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Assignee } from 'src/app/global/store/space-store';
import { ChatService } from '../service/chat.service';
import { AuthService } from 'src/app/user/service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/employee/services/employee.service';
import { HttpClient } from '@angular/common/http';

const url = 'http://localhost:3000/api'

@Component({
  selector: 'app-chat-side-nav',
  templateUrl: './chat-side-nav.component.html',
  styleUrls: ['./chat-side-nav.component.css'],
})

export class ChatSideNavComponent implements OnInit {

  @Output() messageData!:EventEmitter <any> ;

  constructor(
    private _chatService: ChatService,
    private _authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private employeeService: EmployeeService,
    private http: HttpClient
  ) { 
    this.messageData = new EventEmitter<any>();
  }

  assignees: any[] = []
  message?: string
  sender_id?: string
  queryData: any
  sender?: string
  user_id?: string
  managerId?: string

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(queryParams => {
      this.queryData = queryParams;
    });
    if (this.queryData.user) {
      this.sender = this.queryData.user
    }
    let data: any
    if (this.sender == 'manager') {
      data = this._authService.getToken()
      this.user_id = data._id
      
    } else if (this.sender == 'employee') {
      data = this.employeeService.getToken()
      this.managerId = data.managerId
      this.user_id = data._id
    }
    this.fetchAssignees()

  }

  getAssigne() {
    const data = this.employeeService.getToken()
    this.managerId = data.managerId
    return this.http.get<Assignee[]>(`${url}/getAssignee/${this.managerId}`, { withCredentials: true })
  }

  fetchAssignees() {
    let count = 0
    this.getAssigne().subscribe((result) => {
      if (result.length > 0 && count == 0) {
        result.filter(data => {
          if (data._id != this.user_id) {
            this.assignees.push(data)
          }
        })
        count++
        this.getWho()
      }
    })
  }

  getWho() {
    this.activatedRoute.queryParams.subscribe(queryParams => {
      this.queryData = queryParams;
    });
    if (!this.queryData.user) {
      this.sender = this.queryData.user
    }
    let data: any

    if (this.queryData.user == 'manager') {
      data = this._authService.getToken()
      this.user_id = data._id
    } else if (this.queryData.user == 'employee') {
      data = this.employeeService.getToken()
      this.user_id = data._id
      let manager = this._authService.getToken()
      this.assignees.push(manager)
    }
    return data
  }

  getAllmessage(id?: string | null) {
    if (id && this.user_id) {
      const data = {
        sender_id: this.user_id,
        receiver_id: id
      }

      this._chatService.createNewChatRoom(data).subscribe((response) => {        
        if (response.success) {          
          this._chatService.getAllMessages(data).subscribe((messages) => {  
            const values = {
              messages:messages,
              id:id
            }       
            this.messageData.emit(values)
          })
          this.router.navigate([`/chats`],
            { queryParams: { user: this.sender, id: id } }
          )
        } else {
          console.log('failed');
        }
      })
    }
  }

}
