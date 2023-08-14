import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductionreportPage } from './productionreport.page';

const routes: Routes = [
  {
    path: '',
    component: ProductionreportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductionreportPageRoutingModule {}
