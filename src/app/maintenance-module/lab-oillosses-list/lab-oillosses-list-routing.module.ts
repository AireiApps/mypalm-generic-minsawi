import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LabOillossesListPage } from './lab-oillosses-list.page';

const routes: Routes = [
  {
    path: '',
    component: LabOillossesListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LabOillossesListPageRoutingModule {}
