import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatLandingComponent } from './chat-landing/chat-landing.component';
import { ChatnotfoundComponent } from './chatnotfound/chatnotfound.component';

const routes: Routes = [
  { path: '', component: ChatLandingComponent },
  { path: 'select', component: ChatnotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule { }
