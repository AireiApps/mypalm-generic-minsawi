import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { MaintenanceEngineerNotificationModalPageRoutingModule } from "./maintenance-engineer-notification-modal-routing.module";

import { MaintenanceEngineerNotificationModalPage } from "./maintenance-engineer-notification-modal.page";

import { TranslateModule } from "@ngx-translate/core";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TranslateModule,
    MaintenanceEngineerNotificationModalPageRoutingModule,
  ],
  declarations: [MaintenanceEngineerNotificationModalPage],
})
export class MaintenanceEngineerNotificationModalPageModule {}
