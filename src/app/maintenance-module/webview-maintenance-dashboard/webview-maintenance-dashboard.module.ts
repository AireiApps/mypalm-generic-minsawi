import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { WebviewMaintenanceDashboardPageRoutingModule } from "./webview-maintenance-dashboard-routing.module";

import { WebviewMaintenanceDashboardPage } from "./webview-maintenance-dashboard.page";

import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    WebviewMaintenanceDashboardPageRoutingModule,
  ],
  declarations: [WebviewMaintenanceDashboardPage],
})
export class WebviewMaintenanceDashboardPageModule {}
