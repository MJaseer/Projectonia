import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import io from 'socket.io-client';
import { Assignee } from 'src/app/global/store/space-store';
import { i_authRes } from 'src/app/global/user/i-auth-res';
import { i_chatReceiver } from 'src/app/global/user/i-chat-recievers';
import { environment } from 'src/environments/environment';
import { sendMessage } from '../interfaces/activeUser';

const url = `${environment.backendPort}`;

@Injectable({
  providedIn: 'root',
})

export class ChatService {

  constructor(private _http: HttpClient) { }

  private _socket = io(`${url}`);
  messages = ['']


  //to socket.io

  //creating acive userlist when a user open chatting to get live messages
  joinChat(userIds: any) {

    if (userIds) {
      this._socket.emit('join', userIds);
    }

  }

  getAssignees(managerId?: string) {
    return this._http.get<Assignee[]>(`${url}/getAssignee/${managerId}`, { withCredentials: true })
  }

  acitvateUser(userId?: string) {
    if (userId) {
      this._socket.emit('activate', userId);
    }
  }

  activatedUsers() {
    let observable = new Observable<{
        [key: string]: {
          user_id: string;
          socketId: string;
        };
    }>(
      (observer) => {
        this._socket.on('active-users', (data) => {
          console.log(data);
          
          observer.next(data);
        });
        return () => {
          this._socket.disconnect();
        };
      }
    );
    return observable;
  }

  //send messages to socket.io for emitting to receiver
  sendMessage(data: sendMessage) {
    
    this._socket.emit('send-message', data);
  }



  //receiving messages from socket.io to show user
  newMessageReceived() {
    let observable = new Observable<{ user: string; message: string; time?: Date | number }>(
      (observer) => {
        this._socket.on('receive-message', (data) => {
          observer.next(data);
        });
        return () => {
          this._socket.disconnect();
        };
      }
    );
    return observable;
  }

  //disconnect user
  disconnect(user_id: string) {
    this._socket.emit('disconnectUser', user_id)
  }
  //to database

  //adding member_id to db
  createNewChatRoom(data: any) {
    return this._http.post<i_authRes>(`${url}/api/chat/createNewChatRoom`, data);
  }

  //storeMessages in db

  storeSendMessages(data: any) {

    return this._http.post(`${url}/api/chat/storeMessages`, data);
  }

  getAllmessageReceivers(user_id: string) {

    return this._http.get<i_chatReceiver[]>(`${url}/api/chat/getAllReceivers/${user_id}`);
  }

  getAllMessages(details: any) {
    return this._http.get<any>(`${url}/api/chat/getAllMessages/${details.sender_id}/${details.receiver_id}`)
  }

  getChaters(id: string) {
    return this._http.get<any>(`${url}/api/chat/getChaters/${id}`)
  }

}
