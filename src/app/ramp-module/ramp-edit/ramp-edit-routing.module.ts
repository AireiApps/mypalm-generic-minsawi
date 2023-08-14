import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RampEditPage } from './ramp-edit.page';

const routes: Routes = [
  {
    path: '',
    component: RampEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RampEditPageRoutingModule {}
