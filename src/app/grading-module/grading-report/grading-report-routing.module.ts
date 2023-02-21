import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GradingReportPage } from './grading-report.page';

const routes: Routes = [
  {
    path: '',
    component: GradingReportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GradingReportPageRoutingModule {}
