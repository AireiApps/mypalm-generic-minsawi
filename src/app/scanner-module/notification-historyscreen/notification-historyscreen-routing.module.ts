import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotificationHistoryscreenPage } from './notification-historyscreen.page';

const routes: Routes = [
  {
    path: '',
    component: NotificationHistoryscreenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotificationHistoryscreenPageRoutingModule {}
