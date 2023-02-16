import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { ReportCorrectiveMaintenancePageRoutingModule } from "./report-corrective-maintenance-routing.module";

import { ReportCorrectiveMaintenancePage } from "./report-corrective-maintenance.page";

import { OvalShapeModule } from "src/app/component/ux/oval-shape/oval-shape.module";

import { TranslateModule } from "@ngx-translate/core";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    OvalShapeModule,
    IonicModule,
    TranslateModule,
    ReportCorrectiveMaintenancePageRoutingModule,
  ],
  declarations: [ReportCorrectiveMaintenancePage],
})
export class ReportCorrectiveMaintenancePageModule {}
