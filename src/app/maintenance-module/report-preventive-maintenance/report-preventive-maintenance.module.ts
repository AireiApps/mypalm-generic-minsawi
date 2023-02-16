import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { ReportPreventiveMaintenancePageRoutingModule } from "./report-preventive-maintenance-routing.module";

import { ReportPreventiveMaintenancePage } from "./report-preventive-maintenance.page";

import { OvalShapeModule } from "src/app/component/ux/oval-shape/oval-shape.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    OvalShapeModule,
    IonicModule,
    ReportPreventiveMaintenancePageRoutingModule,
  ],
  declarations: [ReportPreventiveMaintenancePage],
})
export class ReportPreventiveMaintenancePageModule {}
