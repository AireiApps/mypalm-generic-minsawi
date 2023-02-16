import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaintenancePreventivemaintenanceCategoryPage } from './maintenance-preventivemaintenance-category.page';

const routes: Routes = [
  {
    path: '',
    component: MaintenancePreventivemaintenanceCategoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaintenancePreventivemaintenanceCategoryPageRoutingModule {}
