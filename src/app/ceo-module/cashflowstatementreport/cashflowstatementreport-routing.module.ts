import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CashflowstatementreportPage } from './cashflowstatementreport.page';

const routes: Routes = [
  {
    path: '',
    component: CashflowstatementreportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CashflowstatementreportPageRoutingModule {}
