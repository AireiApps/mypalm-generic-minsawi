import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { PopupNotificationViewPageRoutingModule } from "./popup-notification-view-routing.module";

import { PopupNotificationViewPage } from "./popup-notification-view.page";

import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TranslateModule,
    PopupNotificationViewPageRoutingModule,
  ],
  declarations: [PopupNotificationViewPage],
})
export class PopupNotificationViewPageModule {}
