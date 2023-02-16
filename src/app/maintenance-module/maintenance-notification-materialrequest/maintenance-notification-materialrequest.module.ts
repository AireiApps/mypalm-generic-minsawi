import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { MaintenanceNotificationMaterialrequestPageRoutingModule } from "./maintenance-notification-materialrequest-routing.module";

import { MaintenanceNotificationMaterialrequestPage } from "./maintenance-notification-materialrequest.page";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    MaintenanceNotificationMaterialrequestPageRoutingModule,
  ],
  declarations: [MaintenanceNotificationMaterialrequestPage],
})
export class MaintenanceNotificationMaterialrequestPageModule {}
