import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaintenancePreventivemaintenanceListPage } from './maintenance-preventivemaintenance-list.page';

const routes: Routes = [
  {
    path: '',
    component: MaintenancePreventivemaintenanceListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaintenancePreventivemaintenanceListPageRoutingModule {}
