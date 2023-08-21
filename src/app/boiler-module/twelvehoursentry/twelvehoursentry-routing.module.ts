import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TwelvehoursentryPage } from './twelvehoursentry.page';

const routes: Routes = [
  {
    path: '',
    component: TwelvehoursentryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TwelvehoursentryPageRoutingModule {}
