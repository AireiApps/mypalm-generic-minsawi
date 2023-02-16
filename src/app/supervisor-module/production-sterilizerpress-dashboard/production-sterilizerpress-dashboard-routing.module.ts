import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductionSterilizerpressDashboardPage } from './production-sterilizerpress-dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: ProductionSterilizerpressDashboardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductionSterilizerpressDashboardPageRoutingModule {}
