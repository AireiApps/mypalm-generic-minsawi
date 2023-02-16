import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardForecastingPageRoutingModule } from './dashboard-forecasting-routing.module';

import { DashboardForecastingPage } from './dashboard-forecasting.page';

import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgApexchartsModule,
    IonicModule,
    DashboardForecastingPageRoutingModule
  ],
  declarations: [DashboardForecastingPage]
})
export class DashboardForecastingPageModule {}
