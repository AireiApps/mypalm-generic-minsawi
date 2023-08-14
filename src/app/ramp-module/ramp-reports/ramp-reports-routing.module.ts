import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RampReportsPage } from './ramp-reports.page';

const routes: Routes = [
  {
    path: '',
    component: RampReportsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RampReportsPageRoutingModule {}
