import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LivetrackingreportPage } from './livetrackingreport.page';

const routes: Routes = [
  {
    path: '',
    component: LivetrackingreportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LivetrackingreportPageRoutingModule {}
