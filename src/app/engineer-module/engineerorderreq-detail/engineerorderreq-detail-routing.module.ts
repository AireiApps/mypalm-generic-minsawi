import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EngineerorderreqDetailPage } from './engineerorderreq-detail.page';

const routes: Routes = [
  {
    path: '',
    component: EngineerorderreqDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EngineerorderreqDetailPageRoutingModule {}
