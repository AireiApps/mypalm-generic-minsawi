import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CeoFinancialreportsHomePage } from './ceo-financialreports-home.page';

const routes: Routes = [
  {
    path: '',
    component: CeoFinancialreportsHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CeoFinancialreportsHomePageRoutingModule {}
