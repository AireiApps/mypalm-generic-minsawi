import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductionSterilizerpressHourlyreportingPageRoutingModule } from './production-sterilizerpress-hourlyreporting-routing.module';

import { ProductionSterilizerpressHourlyreportingPage } from './production-sterilizerpress-hourlyreporting.page';

import { TranslateModule } from "@ngx-translate/core";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ProductionSterilizerpressHourlyreportingPageRoutingModule
  ],
  declarations: [ProductionSterilizerpressHourlyreportingPage]
})
export class ProductionSterilizerpressHourlyreportingPageModule {}
