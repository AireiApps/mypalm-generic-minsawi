import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BoilerlevelsPage } from './boilerlevels.page';

const routes: Routes = [
  {
    path: '',
    component: BoilerlevelsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoilerlevelsPageRoutingModule {}
