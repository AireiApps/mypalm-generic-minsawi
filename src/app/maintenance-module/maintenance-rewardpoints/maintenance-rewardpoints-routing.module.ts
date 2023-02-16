import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaintenanceRewardpointsPage } from './maintenance-rewardpoints.page';

const routes: Routes = [
  {
    path: '',
    component: MaintenanceRewardpointsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaintenanceRewardpointsPageRoutingModule {}
