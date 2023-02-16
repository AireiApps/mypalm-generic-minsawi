import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SegregatenotificationalertsPage } from './segregatenotificationalerts.page';

const routes: Routes = [
  {
    path: '',
    component: SegregatenotificationalertsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SegregatenotificationalertsPageRoutingModule {}
