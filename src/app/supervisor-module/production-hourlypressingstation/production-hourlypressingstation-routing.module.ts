import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductionHourlypressingstationPage } from './production-hourlypressingstation.page';

const routes: Routes = [
  {
    path: '',
    component: ProductionHourlypressingstationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductionHourlypressingstationPageRoutingModule {}
