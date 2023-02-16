import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductionNotificationListPage } from './production-notification-list.page';

const routes: Routes = [
  {
    path: '',
    component: ProductionNotificationListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductionNotificationListPageRoutingModule {}
