import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaintenanceActivitysearchPage } from './maintenance-activitysearch.page';

const routes: Routes = [
  {
    path: '',
    component: MaintenanceActivitysearchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaintenanceActivitysearchPageRoutingModule {}
