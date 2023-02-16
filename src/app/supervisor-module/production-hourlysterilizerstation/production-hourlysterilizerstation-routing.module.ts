import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductionHourlysterilizerstationPage } from './production-hourlysterilizerstation.page';

const routes: Routes = [
  {
    path: '',
    component: ProductionHourlysterilizerstationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductionHourlysterilizerstationPageRoutingModule {}
