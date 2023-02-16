import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { MaintenanceNotificationUpdateModalPageRoutingModule } from "./maintenance-notification-update-modal-routing.module";

import { MaintenanceNotificationUpdateModalPage } from "./maintenance-notification-update-modal.page";

import { TranslateModule } from "@ngx-translate/core";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TranslateModule,
    MaintenanceNotificationUpdateModalPageRoutingModule,
  ],
  declarations: [MaintenanceNotificationUpdateModalPage],
})
export class MaintenanceNotificationUpdateModalPageModule {}
