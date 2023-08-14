import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrepaymentreportPage } from './prepaymentreport.page';

const routes: Routes = [
  {
    path: '',
    component: PrepaymentreportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrepaymentreportPageRoutingModule {}
