import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardOillossPredictionanalysisPage } from './dashboard-oilloss-predictionanalysis.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardOillossPredictionanalysisPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardOillossPredictionanalysisPageRoutingModule {}
