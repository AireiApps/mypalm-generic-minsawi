import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaintenanceNotificationModalPage } from './maintenance-notification-modal.page';

const routes: Routes = [
  {
    path: '',
    component: MaintenanceNotificationModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaintenanceNotificationModalPageRoutingModule {}
