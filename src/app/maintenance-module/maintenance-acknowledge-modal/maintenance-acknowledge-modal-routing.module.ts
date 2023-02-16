import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaintenanceAcknowledgeModalPage } from './maintenance-acknowledge-modal.page';

const routes: Routes = [
  {
    path: '',
    component: MaintenanceAcknowledgeModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaintenanceAcknowledgeModalPageRoutingModule {}
