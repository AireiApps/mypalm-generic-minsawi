import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GradingVehicleSearchPage } from './grading-vehicle-search.page';

const routes: Routes = [
  {
    path: '',
    component: GradingVehicleSearchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GradingVehicleSearchPageRoutingModule {}
