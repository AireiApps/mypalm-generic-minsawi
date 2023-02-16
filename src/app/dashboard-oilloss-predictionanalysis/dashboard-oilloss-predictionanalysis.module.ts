import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardOillossPredictionanalysisPageRoutingModule } from './dashboard-oilloss-predictionanalysis-routing.module';

import { DashboardOillossPredictionanalysisPage } from './dashboard-oilloss-predictionanalysis.page';

import { SharedModule } from 'src/app/shared/shared.module';

import { TranslateModule } from "@ngx-translate/core";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    IonicModule,
    TranslateModule,
    DashboardOillossPredictionanalysisPageRoutingModule
  ],
  declarations: [DashboardOillossPredictionanalysisPage]
})
export class DashboardOillossPredictionanalysisPageModule {}
