import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { MaintenanceReplacementPageRoutingModule } from "./maintenance-replacement-routing.module";

import { MaintenanceReplacementPage } from "./maintenance-replacement.page";

import { OvalShapeModule } from "src/app/component/ux/oval-shape/oval-shape.module";

import { Ng2SearchPipeModule } from "ng2-search-filter";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    OvalShapeModule,
    Ng2SearchPipeModule,
    MaintenanceReplacementPageRoutingModule,
  ],
  declarations: [MaintenanceReplacementPage],
})
export class MaintenanceReplacementPageModule {}
