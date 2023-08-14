import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { DriverVehicleSearchPageRoutingModule } from "./driver-vehicle-search-routing.module";

import { DriverVehicleSearchPage } from "./driver-vehicle-search.page";

import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    IonicModule,
    DriverVehicleSearchPageRoutingModule,
  ],
  declarations: [DriverVehicleSearchPage],
})
export class DriverVehicleSearchPageModule {}
