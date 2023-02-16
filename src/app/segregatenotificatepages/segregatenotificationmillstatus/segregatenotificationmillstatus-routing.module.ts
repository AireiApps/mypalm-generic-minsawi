import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SegregatenotificationmillstatusPage } from './segregatenotificationmillstatus.page';

const routes: Routes = [
  {
    path: '',
    component: SegregatenotificationmillstatusPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SegregatenotificationmillstatusPageRoutingModule {}
