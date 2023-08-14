import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DirectorreportPage } from './directorreport.page';

const routes: Routes = [
  {
    path: '',
    component: DirectorreportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DirectorreportPageRoutingModule {}
