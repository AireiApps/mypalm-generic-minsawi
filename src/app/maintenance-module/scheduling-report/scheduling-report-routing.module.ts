import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SchedulingReportPage } from './scheduling-report.page';

const routes: Routes = [
  {
    path: '',
    component: SchedulingReportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SchedulingReportPageRoutingModule {}
