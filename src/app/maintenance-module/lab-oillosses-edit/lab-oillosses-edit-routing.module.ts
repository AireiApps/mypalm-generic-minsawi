import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LabOillossesEditPage } from './lab-oillosses-edit.page';

const routes: Routes = [
  {
    path: '',
    component: LabOillossesEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LabOillossesEditPageRoutingModule {}
