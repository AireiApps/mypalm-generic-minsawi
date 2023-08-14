import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PurchasereportPage } from './purchasereport.page';

const routes: Routes = [
  {
    path: '',
    component: PurchasereportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PurchasereportPageRoutingModule {}
