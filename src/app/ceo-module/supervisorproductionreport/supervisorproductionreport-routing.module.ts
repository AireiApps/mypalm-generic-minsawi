import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SupervisorproductionreportPage } from './supervisorproductionreport.page';

const routes: Routes = [
  {
    path: '',
    component: SupervisorproductionreportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SupervisorproductionreportPageRoutingModule {}
