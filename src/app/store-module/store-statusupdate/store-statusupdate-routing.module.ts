import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StoreStatusupdatePage } from './store-statusupdate.page';

const routes: Routes = [
  {
    path: '',
    component: StoreStatusupdatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoreStatusupdatePageRoutingModule {}
