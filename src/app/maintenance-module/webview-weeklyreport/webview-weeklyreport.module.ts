import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { WebviewWeeklyreportPageRoutingModule } from "./webview-weeklyreport-routing.module";

import { WebviewWeeklyreportPage } from "./webview-weeklyreport.page";

import { SharedModule } from "src/app/shared/shared.module";

import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    TranslateModule,
    WebviewWeeklyreportPageRoutingModule,
  ],
  declarations: [WebviewWeeklyreportPage],
})
export class WebviewWeeklyreportPageModule {}
