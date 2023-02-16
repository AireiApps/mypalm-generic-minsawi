import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardPredictionanalysisPage } from './dashboard-predictionanalysis.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardPredictionanalysisPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPredictionanalysisPageRoutingModule {}
