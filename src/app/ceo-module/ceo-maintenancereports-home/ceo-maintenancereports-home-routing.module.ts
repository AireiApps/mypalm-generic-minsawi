import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CeoMaintenancereportsHomePage } from './ceo-maintenancereports-home.page';

const routes: Routes = [
  {
    path: '',
    component: CeoMaintenancereportsHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CeoMaintenancereportsHomePageRoutingModule {}
