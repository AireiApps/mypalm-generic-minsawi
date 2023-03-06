import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatbotScreenPageRoutingModule } from './chatbot-screen-routing.module';

import { ChatbotScreenPage } from './chatbot-screen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ChatbotScreenPageRoutingModule
  ],
  declarations: [ChatbotScreenPage]
})
export class ChatbotScreenPageModule {}
