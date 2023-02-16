import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportSterilizerhourlyperformancePage } from './report-sterilizerhourlyperformance.page';

const routes: Routes = [
  {
    path: '',
    component: ReportSterilizerhourlyperformancePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportSterilizerhourlyperformancePageRoutingModule {}
