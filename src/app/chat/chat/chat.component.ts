import { Component, Input } from '@angular/core';
import { ChatService } from '../service/chat.service';
import { AuthService } from 'src/app/user/service/auth.service';
import { i_chatReceiver, i_messages } from 'src/app/global/user/i-chat-recievers';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, Params, } from '@angular/router';
import { EmployeeService } from 'src/app/employee/services/employee.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})

export class ChatComponent {
  @Input() receiver_id: string = '';

  // userDatas!: Assignee[]
  userName: string | null = null;
  user_id!: string;
  messageText: string | null = null;
  messageArray: i_messages[] = [];
  messageData: any
  messageReceivers: i_chatReceiver[] | null = null;
  currentChatPerson: i_chatReceiver | null = null;
  managerId: string = ''
  queryData!: string | Params | any
  isUserAvailable = false
  sender?: string

  private _unsubscribe$ = new Subject();

  constructor(
    private _chatService: ChatService,
    private authSerive: AuthService,
    private activatedRoute: ActivatedRoute,
    private employeeService: EmployeeService,
  ) {
    _chatService.newMessageReceived().subscribe((data) => {
      this.messageArray.push(data);
    });
  }

  takeReciever() {
    this.activatedRoute.queryParams.subscribe(queryParams => {
      this.queryData = queryParams;
    });
    this.receiver_id = this.queryData.id
    if (this.queryData.user) { }
  }

  ngOnInit(): void {

    this.activatedRoute.queryParams.subscribe(queryParams => {
      this.queryData = queryParams;
    });
    this.receiver_id = this.queryData.id

    if (this.queryData.user) {
      this.sender = this.queryData.user
    }
    let data: any
    if (this.sender == 'manager') {
      data = this.authSerive.getToken()
      this.user_id = data._id
    } else if (this.sender == 'employee') {
      data = this.employeeService.getToken()
      this.user_id = data._id
    }
    // joining on socket.io
    if (this.user_id && this.receiver_id) {
      const users = {
        sender_id: this.user_id,
        receiver_id: this.receiver_id
      }
      this._chatService.joinChat(users);
    }
  }

  getMessage(res: any) {
    this.receiver_id = res.id
    this.messageArray = res.messages

    this.ngOnInit()
  }

  sendMessage() {
    //sending to socket.io    
    if (!this.messageText?.trim()) {
      console.log('no messages');
      return;
    }
    const message = {
      user: 'sender',
      message: this.messageText,
      time: Date.now()
    };

    Object.freeze(message);
    this.messageArray.push(message);
    this.activatedRoute.queryParams.subscribe(queryParams => {
      this.queryData = queryParams;
    });

    this.receiver_id = this.queryData.id

    if (this.receiver_id != undefined) {
      //store messages in db
      this._chatService
        .storeSendMessages({
          receiver_id: this.receiver_id,
          sender_id: this.user_id,
          message: this.messageText,
        })
        .pipe(takeUntil(this._unsubscribe$))
        .subscribe();
      //emitting socket  
      this._chatService.sendMessage({
        receiver_id: this.receiver_id,
        message: this.messageText,
      });

      this.messageText = '';
    }


  }

  

}
