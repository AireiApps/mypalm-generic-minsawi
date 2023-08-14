import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BalancesheetPage } from './balancesheet.page';

const routes: Routes = [
  {
    path: '',
    component: BalancesheetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BalancesheetPageRoutingModule {}
