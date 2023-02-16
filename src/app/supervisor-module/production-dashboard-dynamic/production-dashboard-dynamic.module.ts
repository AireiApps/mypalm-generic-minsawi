import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { ProductionDashboardDynamicPageRoutingModule } from "./production-dashboard-dynamic-routing.module";

import { ProductionDashboardDynamicPage } from "./production-dashboard-dynamic.page";

import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    IonicModule,
    ProductionDashboardDynamicPageRoutingModule,
  ],
  declarations: [ProductionDashboardDynamicPage],
})
export class ProductionDashboardDynamicPageModule {}
