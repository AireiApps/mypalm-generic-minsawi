import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DriverSupplierSearchPage } from './driver-supplier-search.page';

const routes: Routes = [
  {
    path: '',
    component: DriverSupplierSearchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DriverSupplierSearchPageRoutingModule {}
