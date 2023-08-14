import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrialbalancereportPage } from './trialbalancereport.page';

const routes: Routes = [
  {
    path: '',
    component: TrialbalancereportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrialbalancereportPageRoutingModule {}
