import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LabOillossesPage } from './lab-oillosses.page';

const routes: Routes = [
  {
    path: '',
    component: LabOillossesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LabOillossesPageRoutingModule {}
