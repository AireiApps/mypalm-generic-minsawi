import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductionHourlysterilizerstationsavePageRoutingModule } from './production-hourlysterilizerstationsave-routing.module';

import { ProductionHourlysterilizerstationsavePage } from './production-hourlysterilizerstationsave.page';

import { TranslateModule } from "@ngx-translate/core";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TranslateModule,
    ProductionHourlysterilizerstationsavePageRoutingModule
  ],
  declarations: [ProductionHourlysterilizerstationsavePage]
})
export class ProductionHourlysterilizerstationsavePageModule {}
