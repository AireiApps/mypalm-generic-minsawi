import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CeoBreakdownlistPage } from './ceo-breakdownlist.page';

const routes: Routes = [
  {
    path: '',
    component: CeoBreakdownlistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CeoBreakdownlistPageRoutingModule {}
