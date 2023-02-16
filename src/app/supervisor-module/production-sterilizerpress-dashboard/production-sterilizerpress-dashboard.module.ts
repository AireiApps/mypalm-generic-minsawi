import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { ProductionSterilizerpressDashboardPageRoutingModule } from "./production-sterilizerpress-dashboard-routing.module";

import { ProductionSterilizerpressDashboardPage } from "./production-sterilizerpress-dashboard.page";

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
    ProductionSterilizerpressDashboardPageRoutingModule,
  ],
  declarations: [ProductionSterilizerpressDashboardPage],
})
export class ProductionSterilizerpressDashboardPageModule {}
