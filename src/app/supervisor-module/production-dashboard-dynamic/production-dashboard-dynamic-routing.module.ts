import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductionDashboardDynamicPage } from './production-dashboard-dynamic.page';

const routes: Routes = [
  {
    path: '',
    component: ProductionDashboardDynamicPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductionDashboardDynamicPageRoutingModule {}
