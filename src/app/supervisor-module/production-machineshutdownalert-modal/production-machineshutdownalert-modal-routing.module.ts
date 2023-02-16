import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductionMachineshutdownalertModalPage } from './production-machineshutdownalert-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ProductionMachineshutdownalertModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductionMachineshutdownalertModalPageRoutingModule {}
