import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HourlyReportsHomePageRoutingModule } from './hourly-reports-home-routing.module';

import { HourlyReportsHomePage } from './hourly-reports-home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HourlyReportsHomePageRoutingModule
  ],
  declarations: [HourlyReportsHomePage]
})
export class HourlyReportsHomePageModule {}
