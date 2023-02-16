import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaintenanceForemanPvrpvListPage } from './maintenance-foreman-pvrpv-list.page';

const routes: Routes = [
  {
    path: '',
    component: MaintenanceForemanPvrpvListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaintenanceForemanPvrpvListPageRoutingModule {}
