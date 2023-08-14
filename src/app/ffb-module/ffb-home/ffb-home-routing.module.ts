import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FfbHomePage } from './ffb-home.page';

const routes: Routes = [
  {
    path: '',
    component: FfbHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FfbHomePageRoutingModule {}
