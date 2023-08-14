import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DailyplPage } from './dailypl.page';

const routes: Routes = [
  {
    path: '',
    component: DailyplPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DailyplPageRoutingModule {}
