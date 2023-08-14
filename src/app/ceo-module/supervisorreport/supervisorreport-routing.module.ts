import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SupervisorreportPage } from './supervisorreport.page';

const routes: Routes = [
  {
    path: '',
    component: SupervisorreportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SupervisorreportPageRoutingModule {}
