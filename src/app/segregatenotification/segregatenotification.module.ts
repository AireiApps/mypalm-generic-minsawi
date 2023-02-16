import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { SegregatenotificationPageRoutingModule } from "./segregatenotification-routing.module";

import { SegregatenotificationPage } from "./segregatenotification.page";

import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    SegregatenotificationPageRoutingModule,
  ],
  declarations: [SegregatenotificationPage],
})
export class SegregatenotificationPageModule {}
