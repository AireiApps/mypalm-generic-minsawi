import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductionHourlpressingstationAlertPage } from './production-hourlpressingstation-alert.page';

const routes: Routes = [
  {
    path: '',
    component: ProductionHourlpressingstationAlertPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductionHourlpressingstationAlertPageRoutingModule {}
