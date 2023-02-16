import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaintenanceMaterialsearchPage } from './maintenance-materialsearch.page';

const routes: Routes = [
  {
    path: '',
    component: MaintenanceMaterialsearchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaintenanceMaterialsearchPageRoutingModule {}
