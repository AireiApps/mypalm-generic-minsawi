import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApprovalsHomePage } from './approvals-home.page';

const routes: Routes = [
  {
    path: '',
    component: ApprovalsHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApprovalsHomePageRoutingModule {}
