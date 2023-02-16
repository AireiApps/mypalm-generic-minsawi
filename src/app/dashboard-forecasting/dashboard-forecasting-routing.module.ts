import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardForecastingPage } from './dashboard-forecasting.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardForecastingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardForecastingPageRoutingModule {}
