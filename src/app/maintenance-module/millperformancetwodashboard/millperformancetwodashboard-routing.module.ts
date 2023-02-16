import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MillperformancetwodashboardPage } from './millperformancetwodashboard.page';

const routes: Routes = [
  {
    path: '',
    component: MillperformancetwodashboardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MillperformancetwodashboardPageRoutingModule {}
