import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { MaintenanceActivitysearchPageRoutingModule } from "./maintenance-activitysearch-routing.module";

import { MaintenanceActivitysearchPage } from "./maintenance-activitysearch.page";

import { PipesModule } from "src/app/pipes/pipes.module";

import { TranslateModule } from "@ngx-translate/core";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    TranslateModule,
    MaintenanceActivitysearchPageRoutingModule,
  ],
  declarations: [MaintenanceActivitysearchPage],
})
export class MaintenanceActivitysearchPageModule {}
