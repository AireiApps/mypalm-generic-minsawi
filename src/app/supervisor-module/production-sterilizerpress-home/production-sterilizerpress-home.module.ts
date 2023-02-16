import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductionSterilizerpressHomePageRoutingModule } from './production-sterilizerpress-home-routing.module';

import { ProductionSterilizerpressHomePage } from './production-sterilizerpress-home.page';

import { TranslateModule } from "@ngx-translate/core";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ProductionSterilizerpressHomePageRoutingModule
  ],
  declarations: [ProductionSterilizerpressHomePage]
})
export class ProductionSterilizerpressHomePageModule {}
