import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LabOillossesreportPage } from './lab-oillossesreport.page';

const routes: Routes = [
  {
    path: '',
    component: LabOillossesreportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LabOillossesreportPageRoutingModule {}
