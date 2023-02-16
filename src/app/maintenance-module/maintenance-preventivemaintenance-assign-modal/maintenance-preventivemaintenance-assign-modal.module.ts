import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { MaintenancePreventivemaintenanceAssignModalPageRoutingModule } from "./maintenance-preventivemaintenance-assign-modal-routing.module";

import { MaintenancePreventivemaintenanceAssignModalPage } from "./maintenance-preventivemaintenance-assign-modal.page";

import { TranslateModule } from "@ngx-translate/core";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TranslateModule,
    MaintenancePreventivemaintenanceAssignModalPageRoutingModule,
  ],
  declarations: [MaintenancePreventivemaintenanceAssignModalPage],
})
export class MaintenancePreventivemaintenanceAssignModalPageModule {}
