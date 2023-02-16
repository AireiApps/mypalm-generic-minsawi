import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MillperformanceonedashboardPage } from './millperformanceonedashboard.page';

const routes: Routes = [
  {
    path: '',
    component: MillperformanceonedashboardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MillperformanceonedashboardPageRoutingModule {}
