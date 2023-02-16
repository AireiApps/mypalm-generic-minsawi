import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MillperformancetwodashboardPageRoutingModule } from './millperformancetwodashboard-routing.module';

import { MillperformancetwodashboardPage } from './millperformancetwodashboard.page';

import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgApexchartsModule,
    IonicModule,
    MillperformancetwodashboardPageRoutingModule
  ],
  declarations: [MillperformancetwodashboardPage]
})
export class MillperformancetwodashboardPageModule {}
