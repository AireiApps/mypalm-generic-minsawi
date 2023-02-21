import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { GradingVehicleSearchPageRoutingModule } from "./grading-vehicle-search-routing.module";

import { GradingVehicleSearchPage } from "./grading-vehicle-search.page";

import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    IonicModule,
    GradingVehicleSearchPageRoutingModule,
  ],
  declarations: [GradingVehicleSearchPage],
})
export class GradingVehicleSearchPageModule {}
