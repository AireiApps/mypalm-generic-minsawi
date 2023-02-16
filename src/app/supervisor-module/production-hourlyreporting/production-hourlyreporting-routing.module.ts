import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductionHourlyreportingPage } from './production-hourlyreporting.page';

const routes: Routes = [
  {
    path: '',
    component: ProductionHourlyreportingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductionHourlyreportingPageRoutingModule {}
