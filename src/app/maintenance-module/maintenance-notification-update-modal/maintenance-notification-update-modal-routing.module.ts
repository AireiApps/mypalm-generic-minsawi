import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaintenanceNotificationUpdateModalPage } from './maintenance-notification-update-modal.page';

const routes: Routes = [
  {
    path: '',
    component: MaintenanceNotificationUpdateModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaintenanceNotificationUpdateModalPageRoutingModule {}
