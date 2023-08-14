import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CeoWeighbridgereportPage } from './ceo-weighbridgereport.page';

const routes: Routes = [
  {
    path: '',
    component: CeoWeighbridgereportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CeoWeighbridgereportPageRoutingModule {}
