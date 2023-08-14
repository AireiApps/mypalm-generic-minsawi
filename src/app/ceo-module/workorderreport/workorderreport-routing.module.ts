import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkorderreportPage } from './workorderreport.page';

const routes: Routes = [
  {
    path: '',
    component: WorkorderreportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkorderreportPageRoutingModule {}
