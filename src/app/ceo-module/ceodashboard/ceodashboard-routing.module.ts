import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CeodashboardPage } from './ceodashboard.page';

const routes: Routes = [
  {
    path: '',
    component: CeodashboardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CeodashboardPageRoutingModule {}
