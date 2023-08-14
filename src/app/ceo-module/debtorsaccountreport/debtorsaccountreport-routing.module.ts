import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DebtorsaccountreportPage } from './debtorsaccountreport.page';

const routes: Routes = [
  {
    path: '',
    component: DebtorsaccountreportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DebtorsaccountreportPageRoutingModule {}
