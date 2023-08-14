import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SorengineerapprovalPage } from './sorengineerapproval.page';

const routes: Routes = [
  {
    path: '',
    component: SorengineerapprovalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SorengineerapprovalPageRoutingModule {}
