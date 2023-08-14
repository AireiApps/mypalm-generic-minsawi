import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CeoProductionreportsHomePage } from './ceo-productionreports-home.page';

const routes: Routes = [
  {
    path: '',
    component: CeoProductionreportsHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CeoProductionreportsHomePageRoutingModule {}
