import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { GradingVehicleSearchNewPageRoutingModule } from "./grading-vehicle-search-new-routing.module";

import { GradingVehicleSearchNewPage } from "./grading-vehicle-search-new.page";

import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ReactiveFormsModule,
    GradingVehicleSearchNewPageRoutingModule,
  ],
  declarations: [GradingVehicleSearchNewPage],
})
export class GradingVehicleSearchNewPageModule {}
