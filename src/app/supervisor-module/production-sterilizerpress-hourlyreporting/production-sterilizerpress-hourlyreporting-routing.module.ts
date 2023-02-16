import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductionSterilizerpressHourlyreportingPage } from './production-sterilizerpress-hourlyreporting.page';

const routes: Routes = [
  {
    path: '',
    component: ProductionSterilizerpressHourlyreportingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductionSterilizerpressHourlyreportingPageRoutingModule {}
