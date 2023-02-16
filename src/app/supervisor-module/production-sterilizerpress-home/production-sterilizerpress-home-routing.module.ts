import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductionSterilizerpressHomePage } from './production-sterilizerpress-home.page';

const routes: Routes = [
  {
    path: '',
    component: ProductionSterilizerpressHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductionSterilizerpressHomePageRoutingModule {}
