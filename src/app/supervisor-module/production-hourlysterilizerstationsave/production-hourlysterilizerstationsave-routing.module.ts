import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductionHourlysterilizerstationsavePage } from './production-hourlysterilizerstationsave.page';

const routes: Routes = [
  {
    path: '',
    component: ProductionHourlysterilizerstationsavePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductionHourlysterilizerstationsavePageRoutingModule {}
