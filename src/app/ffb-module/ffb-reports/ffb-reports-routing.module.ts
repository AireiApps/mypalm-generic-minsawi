import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FfbReportsPage } from './ffb-reports.page';

const routes: Routes = [
  {
    path: '',
    component: FfbReportsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FfbReportsPageRoutingModule {}
