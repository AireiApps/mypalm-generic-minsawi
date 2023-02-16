import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { MaintenanceNotificationModalPageRoutingModule } from "./maintenance-notification-modal-routing.module";

import { MaintenanceNotificationModalPage } from "./maintenance-notification-modal.page";

import { TranslateModule } from "@ngx-translate/core";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TranslateModule,
    MaintenanceNotificationModalPageRoutingModule,
  ],
  declarations: [MaintenanceNotificationModalPage],
})
export class MaintenanceNotificationModalPageModule {}
