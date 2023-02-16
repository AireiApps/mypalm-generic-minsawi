import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportCorrectiveMaintenancePage } from './report-corrective-maintenance.page';

const routes: Routes = [
  {
    path: '',
    component: ReportCorrectiveMaintenancePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportCorrectiveMaintenancePageRoutingModule {}
