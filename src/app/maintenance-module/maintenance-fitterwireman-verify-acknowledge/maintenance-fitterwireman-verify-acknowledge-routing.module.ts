import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaintenanceFitterwiremanVerifyAcknowledgePage } from './maintenance-fitterwireman-verify-acknowledge.page';

const routes: Routes = [
  {
    path: '',
    component: MaintenanceFitterwiremanVerifyAcknowledgePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaintenanceFitterwiremanVerifyAcknowledgePageRoutingModule {}
