import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatbotScreenPage } from './chatbot-screen.page';

const routes: Routes = [
  {
    path: '',
    component: ChatbotScreenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatbotScreenPageRoutingModule {}
