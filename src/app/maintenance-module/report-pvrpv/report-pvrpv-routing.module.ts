import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportPvrpvPage } from './report-pvrpv.page';

const routes: Routes = [
  {
    path: '',
    component: ReportPvrpvPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportPvrpvPageRoutingModule {}
