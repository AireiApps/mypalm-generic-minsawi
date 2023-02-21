import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { GradingReportPageRoutingModule } from "./grading-report-routing.module";

import { GradingReportPage } from "./grading-report.page";

import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    IonicModule,
    GradingReportPageRoutingModule,
  ],
  declarations: [GradingReportPage],
})
export class GradingReportPageModule {}
