import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { MaintenanceRoutinePageRoutingModule } from "./maintenance-routine-routing.module";

import { MaintenanceRoutinePage } from "./maintenance-routine.page";

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
    MaintenanceRoutinePageRoutingModule,
  ],
  declarations: [MaintenanceRoutinePage],
})
export class MaintenanceRoutinePageModule {}
