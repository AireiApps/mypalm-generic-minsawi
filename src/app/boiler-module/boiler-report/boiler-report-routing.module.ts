import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BoilerReportPage } from './boiler-report.page';

const routes: Routes = [
  {
    path: '',
    component: BoilerReportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoilerReportPageRoutingModule {}
