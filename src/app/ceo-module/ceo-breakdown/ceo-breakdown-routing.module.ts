import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CeoBreakdownPage } from './ceo-breakdown.page';

const routes: Routes = [
  {
    path: '',
    component: CeoBreakdownPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CeoBreakdownPageRoutingModule {}
