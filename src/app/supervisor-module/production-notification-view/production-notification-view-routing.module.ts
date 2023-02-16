import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductionNotificationViewPage } from './production-notification-view.page';

const routes: Routes = [
  {
    path: '',
    component: ProductionNotificationViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductionNotificationViewPageRoutingModule {}
