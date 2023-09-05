import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './chat/chat.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ChatLandingComponent } from './chat-landing/chat-landing.component';
import { ChatNavComponent } from './chat-nav/chat-nav.component';
import { ChatSideNavComponent } from './chat-side-nav/chat-side-nav.component';
import { ChatnotfoundComponent } from './chatnotfound/chatnotfound.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    ChatComponent,
    ChatLandingComponent,
    ChatNavComponent,
    ChatSideNavComponent,
    ChatnotfoundComponent,
  ],
  imports: [
    CommonModule,
    ChatRoutingModule,
    FormsModule,
    HttpClientModule,
    MatIconModule
    ]
})

export class ChatModule { }
