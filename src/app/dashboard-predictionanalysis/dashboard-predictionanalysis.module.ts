import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPredictionanalysisPageRoutingModule } from './dashboard-predictionanalysis-routing.module';

import { DashboardPredictionanalysisPage } from './dashboard-predictionanalysis.page';

import { SharedModule } from 'src/app/shared/shared.module';

import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    NgApexchartsModule,
    IonicModule,
    DashboardPredictionanalysisPageRoutingModule
  ],
  declarations: [DashboardPredictionanalysisPage]
})
export class DashboardPredictionanalysisPageModule {}
