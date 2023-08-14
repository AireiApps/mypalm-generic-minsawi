import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StoreIssuePage } from './store-issue.page';

const routes: Routes = [
  {
    path: '',
    component: StoreIssuePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoreIssuePageRoutingModule {}
