import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HealthreportPage } from './healthreport.page';

const routes: Routes = [
  {
    path: '',
    component: HealthreportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HealthreportPageRoutingModule {}
