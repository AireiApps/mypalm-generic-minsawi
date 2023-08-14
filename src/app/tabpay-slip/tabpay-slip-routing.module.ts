import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabpaySlipPage } from './tabpay-slip.page';

const routes: Routes = [
  {
    path: '',
    component: TabpaySlipPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabpaySlipPageRoutingModule {}
