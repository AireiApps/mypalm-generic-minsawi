import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PurchasemonthlyreportPage } from './purchasemonthlyreport.page';

const routes: Routes = [
  {
    path: '',
    component: PurchasemonthlyreportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PurchasemonthlyreportPageRoutingModule {}
