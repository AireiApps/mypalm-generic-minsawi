import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CeoUseractivityMaintenancePage } from './ceo-useractivity-maintenance.page';

const routes: Routes = [
  {
    path: '',
    component: CeoUseractivityMaintenancePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CeoUseractivityMaintenancePageRoutingModule {}
