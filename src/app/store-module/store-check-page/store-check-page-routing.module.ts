import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StoreCheckPagePage } from './store-check-page.page';

const routes: Routes = [
  {
    path: '',
    component: StoreCheckPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoreCheckPagePageRoutingModule {}
