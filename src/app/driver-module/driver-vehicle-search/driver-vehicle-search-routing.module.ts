import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DriverVehicleSearchPage } from './driver-vehicle-search.page';

const routes: Routes = [
  {
    path: '',
    component: DriverVehicleSearchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DriverVehicleSearchPageRoutingModule {}
