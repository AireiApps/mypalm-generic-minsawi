import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaintenancePvrpvListPage } from './maintenance-pvrpv-list.page';

const routes: Routes = [
  {
    path: '',
    component: MaintenancePvrpvListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaintenancePvrpvListPageRoutingModule {}
