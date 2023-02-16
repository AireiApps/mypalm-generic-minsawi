import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductionHourlypressingstationsavePage } from './production-hourlypressingstationsave.page';

const routes: Routes = [
  {
    path: '',
    component: ProductionHourlypressingstationsavePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductionHourlypressingstationsavePageRoutingModule {}
