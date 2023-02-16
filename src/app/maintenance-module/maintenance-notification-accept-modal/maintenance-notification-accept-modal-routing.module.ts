import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaintenanceNotificationAcceptModalPage } from './maintenance-notification-accept-modal.page';

const routes: Routes = [
  {
    path: '',
    component: MaintenanceNotificationAcceptModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaintenanceNotificationAcceptModalPageRoutingModule {}
