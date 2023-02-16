import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WebviewMaintenanceDashboardPage } from './webview-maintenance-dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: WebviewMaintenanceDashboardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WebviewMaintenanceDashboardPageRoutingModule {}
