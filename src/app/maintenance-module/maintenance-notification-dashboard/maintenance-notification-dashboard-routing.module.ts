import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaintenanceNotificationDashboardPage } from './maintenance-notification-dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: MaintenanceNotificationDashboardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaintenanceNotificationDashboardPageRoutingModule {}
