import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CeoProductionandmaintenancechecklistreportPage } from './ceo-productionandmaintenancechecklistreport.page';

const routes: Routes = [
  {
    path: '',
    component: CeoProductionandmaintenancechecklistreportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CeoProductionandmaintenancechecklistreportPageRoutingModule {}
