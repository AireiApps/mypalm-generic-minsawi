import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CpoDispatchReportPage } from './cpo-dispatch-report.page';

const routes: Routes = [
  {
    path: '',
    component: CpoDispatchReportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CpoDispatchReportPageRoutingModule {}
