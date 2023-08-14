import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MonthlyffbcreditorsreportPage } from './monthlyffbcreditorsreport.page';

const routes: Routes = [
  {
    path: '',
    component: MonthlyffbcreditorsreportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MonthlyffbcreditorsreportPageRoutingModule {}
