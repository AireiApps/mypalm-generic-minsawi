import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { MaintenanceNotificationAcceptModalPageRoutingModule } from "./maintenance-notification-accept-modal-routing.module";

import { MaintenanceNotificationAcceptModalPage } from "./maintenance-notification-accept-modal.page";

import { TranslateModule } from "@ngx-translate/core";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TranslateModule,
    MaintenanceNotificationAcceptModalPageRoutingModule,
  ],
  declarations: [MaintenanceNotificationAcceptModalPage],
})
export class MaintenanceNotificationAcceptModalPageModule {}
