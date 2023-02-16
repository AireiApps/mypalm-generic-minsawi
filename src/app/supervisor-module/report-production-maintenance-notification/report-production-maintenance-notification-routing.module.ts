import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportProductionMaintenanceNotificationPage } from './report-production-maintenance-notification.page';

const routes: Routes = [
  {
    path: '',
    component: ReportProductionMaintenanceNotificationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportProductionMaintenanceNotificationPageRoutingModule {}
