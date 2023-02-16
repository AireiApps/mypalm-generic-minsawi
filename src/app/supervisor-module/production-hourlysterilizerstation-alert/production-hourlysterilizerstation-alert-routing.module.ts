import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductionHourlysterilizerstationAlertPage } from './production-hourlysterilizerstation-alert.page';

const routes: Routes = [
  {
    path: '',
    component: ProductionHourlysterilizerstationAlertPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductionHourlysterilizerstationAlertPageRoutingModule {}
