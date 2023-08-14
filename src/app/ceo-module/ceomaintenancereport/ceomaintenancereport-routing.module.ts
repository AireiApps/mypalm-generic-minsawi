import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CeomaintenancereportPage } from './ceomaintenancereport.page';

const routes: Routes = [
  {
    path: '',
    component: CeomaintenancereportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CeomaintenancereportPageRoutingModule {}
