import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DailyexpensereportPage } from './dailyexpensereport.page';

const routes: Routes = [
  {
    path: '',
    component: DailyexpensereportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DailyexpensereportPageRoutingModule {}
