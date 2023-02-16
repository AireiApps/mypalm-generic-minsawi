import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportPreventiveMaintenancePage } from './report-preventive-maintenance.page';

const routes: Routes = [
  {
    path: '',
    component: ReportPreventiveMaintenancePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportPreventiveMaintenancePageRoutingModule {}
