import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaintenanceReplacementPage } from './maintenance-replacement.page';

const routes: Routes = [
  {
    path: '',
    component: MaintenanceReplacementPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaintenanceReplacementPageRoutingModule {}
