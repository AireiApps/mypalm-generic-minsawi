import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GradingVehicleSearchNewPage } from './grading-vehicle-search-new.page';

const routes: Routes = [
  {
    path: '',
    component: GradingVehicleSearchNewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GradingVehicleSearchNewPageRoutingModule {}
