import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaintenanceNotificationReportsPage } from './maintenance-notification-reports.page';

const routes: Routes = [
  {
    path: '',
    component: MaintenanceNotificationReportsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaintenanceNotificationReportsPageRoutingModule {}
