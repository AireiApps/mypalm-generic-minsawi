import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaintenanceNotificationMaterialrequestPage } from './maintenance-notification-materialrequest.page';

const routes: Routes = [
  {
    path: '',
    component: MaintenanceNotificationMaterialrequestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaintenanceNotificationMaterialrequestPageRoutingModule {}
