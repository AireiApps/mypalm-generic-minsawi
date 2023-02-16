import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductionNotificationNewPage } from './production-notification-new.page';

const routes: Routes = [
  {
    path: '',
    component: ProductionNotificationNewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductionNotificationNewPageRoutingModule {}
