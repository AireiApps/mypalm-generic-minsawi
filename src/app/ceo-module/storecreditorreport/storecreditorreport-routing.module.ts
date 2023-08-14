import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StorecreditorreportPage } from './storecreditorreport.page';

const routes: Routes = [
  {
    path: '',
    component: StorecreditorreportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StorecreditorreportPageRoutingModule {}
