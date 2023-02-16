import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WebviewProductionDashboardPage } from './webview-production-dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: WebviewProductionDashboardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WebviewProductionDashboardPageRoutingModule {}
