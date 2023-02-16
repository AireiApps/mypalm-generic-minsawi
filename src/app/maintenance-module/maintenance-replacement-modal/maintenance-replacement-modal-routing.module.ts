import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaintenanceReplacementModalPage } from './maintenance-replacement-modal.page';

const routes: Routes = [
  {
    path: '',
    component: MaintenanceReplacementModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaintenanceReplacementModalPageRoutingModule {}
