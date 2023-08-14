import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SustainchecklistPage } from './sustainchecklist.page';

const routes: Routes = [
  {
    path: '',
    component: SustainchecklistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SustainchecklistPageRoutingModule {}
