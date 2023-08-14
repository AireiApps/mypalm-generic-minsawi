import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductiontimelinehomePage } from './productiontimelinehome.page';

const routes: Routes = [
  {
    path: '',
    component: ProductiontimelinehomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductiontimelinehomePageRoutingModule {}
