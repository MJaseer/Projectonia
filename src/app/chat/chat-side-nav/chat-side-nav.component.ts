import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Assignee } from 'src/app/global/store/space-store';
import { ChatService } from '../service/chat.service';
import { AuthService } from 'src/app/user/service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/employee/services/employee.service';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

const url = `${environment.backendPort}/api`

@Component({
  selector: 'app-chat-side-nav',
  templateUrl: './chat-side-nav.component.html',
  styleUrls: ['./chat-side-nav.component.css'],
})

export class ChatSideNavComponent implements OnInit {

  private _unsubscribe$ = new Subject();

  @Output() messageData!: EventEmitter<any>;
  @Output() chatersData!: EventEmitter<any>


  constructor(
    private _chatService: ChatService,
    private _authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private employeeService: EmployeeService,
    private http: HttpClient,
  ) {
    this.messageData = new EventEmitter<any>();
    this.chatersData = new EventEmitter<any>();
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
      this.getChater(data._id)
    } else if (this.sender == 'employee') {
      data = this.employeeService.getToken()
      this.managerId = data.managerId
      this.user_id = data._id
      this.getChater(data._id)
    }

    // this.fetchAssignees()

  }

  getChater(id: string) {

    if (id)
      this._chatService.getChaters(id).subscribe(
        (result) => {
          this.managerShowData = result
          this.managerShowData.forEach(chater => {
            console.log(chater.time);
            
            if (chater) {
              if (chater?.user_id) {
                chater.time = new Date(chater.time)
              }
            }
          })
          this.managerShowData.sort((a,b)=> b.time - a.time)
          console.log(this.managerShowData);
          
          this.chatersData.emit(result)
        })

  }

  managerShowData: {
    fname: any;
    readed: boolean;
    user_id: any;
    time: any
  }[] = []


  onlineIndicator(assignee: any[]) {
    this._chatService.activatedUsers().subscribe((data) => {
      let managerShowData: {
        fname: any;
        online: boolean;
        user_id: any;
      }[] = []
      Object.keys(data).forEach((key) => {
        if (data) {

          assignee.forEach(assigneData => {
            if (assigneData) {
              if (this.sender == 'manager') {
                if (assigneData._id == data[key].user_id) {
                  console.log(assigneData, '1');
                  managerShowData.push({ fname: assigneData.fname, online: true, user_id: assigneData._id })
                } else {

                  managerShowData.push({ fname: assigneData.fname, online: false, user_id: assigneData._id })
                }
              } else {
                if (assigneData._id == data[key].user_id) {
                  console.log(assigneData);
                  managerShowData.push({ fname: assigneData.fname, online: true, user_id: assigneData._id })
                } else {
                  managerShowData.push({ fname: assigneData.fname, online: false, user_id: assigneData._id })
                }
              }

            }

          })

        }

      })

      this.removeDuplicates(managerShowData)
    });

  }

  removeDuplicates(arr: any) {
    const uniqueArray: any[] = [];
    const seenUserIds: Set<string> = new Set();

    for (const user of arr) {
      if (!seenUserIds.has(user.user_id)) {
        seenUserIds.add(user.user_id);
        uniqueArray.push(user);
      }
    }
    console.log(uniqueArray);
    this.managerShowData = uniqueArray
    return uniqueArray;
  }

  getAssigne() {
    const data = this.employeeService.getToken()
    if (data) {
      this.managerId = data.managerId
    } else {
      const data = this._authService.getToken()
      this.managerId = data._id
    }
    return this.http.get<Assignee[]>(`${url}/getAssignee/${this.managerId}`, { withCredentials: true })
  }

  getActivesUsers() {
    const data = this.employeeService.getToken()
    let id;
    if (data) {
      id = data._id
    } else {
      const data = this._authService.getToken()
      id = data._id
    }

    this._chatService.acitvateUser(id)
  }

  fetchAssignees() {
    let count = 0
    this.getActivesUsers()
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
      let manager = {
        fname: 'Manager',
        _id: data.managerId
      }

      this.assignees.push(manager)
    }
    // this.onlineIndicator(this.assignees)
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
              messages: messages.messages,
              id: id
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

  ngOnDestroy(): void {
    if (this.user_id) {
      this._chatService.disconnect(this.user_id);
      this._unsubscribe$.unsubscribe();
    }

  }

}
