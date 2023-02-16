import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SegregatenotificationmaintenancenotificationPage } from './segregatenotificationmaintenancenotification.page';

const routes: Routes = [
  {
    path: '',
    component: SegregatenotificationmaintenancenotificationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SegregatenotificationmaintenancenotificationPageRoutingModule {}
