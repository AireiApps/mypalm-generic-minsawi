import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CeosupervisorproductioncommentsPage } from './ceosupervisorproductioncomments.page';

const routes: Routes = [
  {
    path: '',
    component: CeosupervisorproductioncommentsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CeosupervisorproductioncommentsPageRoutingModule {}
