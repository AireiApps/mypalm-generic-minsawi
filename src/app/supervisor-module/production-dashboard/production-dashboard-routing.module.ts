import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductionDashboardPage } from './production-dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: ProductionDashboardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductionDashboardPageRoutingModule {}
