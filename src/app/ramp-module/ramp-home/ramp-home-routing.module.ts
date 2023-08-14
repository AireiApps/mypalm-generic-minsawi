import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RampHomePage } from './ramp-home.page';

const routes: Routes = [
  {
    path: '',
    component: RampHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RampHomePageRoutingModule {}
