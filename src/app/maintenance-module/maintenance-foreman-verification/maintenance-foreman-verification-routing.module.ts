import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaintenanceForemanVerificationPage } from './maintenance-foreman-verification.page';

const routes: Routes = [
  {
    path: '',
    component: MaintenanceForemanVerificationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaintenanceForemanVerificationPageRoutingModule {}
