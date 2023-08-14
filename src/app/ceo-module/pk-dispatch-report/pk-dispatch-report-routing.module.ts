import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PkDispatchReportPage } from './pk-dispatch-report.page';

const routes: Routes = [
  {
    path: '',
    component: PkDispatchReportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PkDispatchReportPageRoutingModule {}
