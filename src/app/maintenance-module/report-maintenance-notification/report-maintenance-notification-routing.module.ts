import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportMaintenanceNotificationPage } from './report-maintenance-notification.page';

const routes: Routes = [
  {
    path: '',
    component: ReportMaintenanceNotificationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportMaintenanceNotificationPageRoutingModule {}
