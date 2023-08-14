import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BudgetcomparereportPage } from './budgetcomparereport.page';

const routes: Routes = [
  {
    path: '',
    component: BudgetcomparereportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BudgetcomparereportPageRoutingModule {}
