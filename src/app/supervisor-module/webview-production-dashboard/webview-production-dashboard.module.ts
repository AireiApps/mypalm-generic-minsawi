import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { WebviewProductionDashboardPageRoutingModule } from "./webview-production-dashboard-routing.module";

import { WebviewProductionDashboardPage } from "./webview-production-dashboard.page";

import { SharedModule } from "src/app/shared/shared.module";

import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    SharedModule,
    WebviewProductionDashboardPageRoutingModule,
  ],
  declarations: [WebviewProductionDashboardPage],
})
export class WebviewProductionDashboardPageModule {}
