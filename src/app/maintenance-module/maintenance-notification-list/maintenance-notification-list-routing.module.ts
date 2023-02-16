import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaintenanceNotificationListPage } from './maintenance-notification-list.page';

const routes: Routes = [
  {
    path: '',
    component: MaintenanceNotificationListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaintenanceNotificationListPageRoutingModule {}
