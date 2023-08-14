import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SorreportPage } from './sorreport.page';

const routes: Routes = [
  {
    path: '',
    component: SorreportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SorreportPageRoutingModule {}
