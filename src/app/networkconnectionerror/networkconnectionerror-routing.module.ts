import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NetworkconnectionerrorPage } from './networkconnectionerror.page';

const routes: Routes = [
  {
    path: '',
    component: NetworkconnectionerrorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NetworkconnectionerrorPageRoutingModule {}
