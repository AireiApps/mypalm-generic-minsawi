import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CostofproductionreportPage } from './costofproductionreport.page';

const routes: Routes = [
  {
    path: '',
    component: CostofproductionreportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CostofproductionreportPageRoutingModule {}
