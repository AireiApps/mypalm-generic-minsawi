import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BoilerReportPageRoutingModule } from './boiler-report-routing.module';

import { BoilerReportPage } from './boiler-report.page';

import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    TranslateModule,
    BoilerReportPageRoutingModule
  ],
  declarations: [BoilerReportPage]
})
export class BoilerReportPageModule {}
