import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DailystockreportPage } from './dailystockreport.page';

const routes: Routes = [
  {
    path: '',
    component: DailystockreportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DailystockreportPageRoutingModule {}
