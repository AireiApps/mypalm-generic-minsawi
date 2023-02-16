import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { MaintenanceDashboardPageRoutingModule } from "./maintenance-dashboard-routing.module";

import { MaintenanceDashboardPage } from "./maintenance-dashboard.page";

import { Ng2SearchPipeModule } from "ng2-search-filter";

import { TranslateModule } from "@ngx-translate/core";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    IonicModule,
    TranslateModule,
    MaintenanceDashboardPageRoutingModule,
  ],
  declarations: [MaintenanceDashboardPage],
})
export class MaintenanceDashboardPageModule {}
