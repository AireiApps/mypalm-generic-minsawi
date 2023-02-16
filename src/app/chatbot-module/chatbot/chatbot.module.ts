import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { ChatbotPageRoutingModule } from "./chatbot-routing.module";

import { ChatbotPage } from "./chatbot.page";

import { SharedModule } from "src/app/shared/shared.module";

import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    SharedModule,
    ChatbotPageRoutingModule,
  ],
  declarations: [ChatbotPage],
})
export class ChatbotPageModule {}
