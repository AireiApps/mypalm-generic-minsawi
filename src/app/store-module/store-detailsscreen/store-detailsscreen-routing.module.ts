import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StoreDetailsscreenPage } from './store-detailsscreen.page';

const routes: Routes = [
  {
    path: '',
    component: StoreDetailsscreenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoreDetailsscreenPageRoutingModule {}
