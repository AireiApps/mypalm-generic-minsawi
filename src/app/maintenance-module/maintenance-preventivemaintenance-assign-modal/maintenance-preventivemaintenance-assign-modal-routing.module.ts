import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaintenancePreventivemaintenanceAssignModalPage } from './maintenance-preventivemaintenance-assign-modal.page';

const routes: Routes = [
  {
    path: '',
    component: MaintenancePreventivemaintenanceAssignModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaintenancePreventivemaintenanceAssignModalPageRoutingModule {}
