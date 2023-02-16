import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { ReportPressstationhourlyperformancePageRoutingModule } from "./report-pressstationhourlyperformance-routing.module";

import { ReportPressstationhourlyperformancePage } from "./report-pressstationhourlyperformance.page";

import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    ReactiveFormsModule,
    IonicModule,
    ReportPressstationhourlyperformancePageRoutingModule,
  ],
  declarations: [ReportPressstationhourlyperformancePage],
})
export class ReportPressstationhourlyperformancePageModule {}
