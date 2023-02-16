import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaintenanceForemanNotificationListPage } from './maintenance-foreman-notification-list.page';

const routes: Routes = [
  {
    path: '',
    component: MaintenanceForemanNotificationListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaintenanceForemanNotificationListPageRoutingModule {}
