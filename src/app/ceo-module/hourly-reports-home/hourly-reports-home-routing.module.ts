import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HourlyReportsHomePage } from './hourly-reports-home.page';

const routes: Routes = [
  {
    path: '',
    component: HourlyReportsHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HourlyReportsHomePageRoutingModule {}
