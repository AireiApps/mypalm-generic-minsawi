import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OtherDispatchReportPage } from './other-dispatch-report.page';

const routes: Routes = [
  {
    path: '',
    component: OtherDispatchReportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OtherDispatchReportPageRoutingModule {}
