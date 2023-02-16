import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaintenanceHomePage } from './maintenance-home.page';

const routes: Routes = [
  {
    path: '',
    component: MaintenanceHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaintenanceHomePageRoutingModule {}
