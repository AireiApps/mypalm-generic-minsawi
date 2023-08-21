import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FourhoursentryPage } from './fourhoursentry.page';

const routes: Routes = [
  {
    path: '',
    component: FourhoursentryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FourhoursentryPageRoutingModule {}
