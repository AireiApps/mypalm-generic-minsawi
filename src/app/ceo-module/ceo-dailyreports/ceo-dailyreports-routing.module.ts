import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CeoDailyreportsPage } from './ceo-dailyreports.page';

const routes: Routes = [
  {
    path: '',
    component: CeoDailyreportsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CeoDailyreportsPageRoutingModule {}
