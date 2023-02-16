import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductionReportPageRoutingModule } from './production-report-routing.module';

import { ProductionReportPage } from './production-report.page';

import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    IonicModule,
    ProductionReportPageRoutingModule
  ],
  declarations: [ProductionReportPage]
})
export class ProductionReportPageModule {}
