import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TwohoursentryPage } from './twohoursentry.page';

const routes: Routes = [
  {
    path: '',
    component: TwohoursentryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TwohoursentryPageRoutingModule {}
