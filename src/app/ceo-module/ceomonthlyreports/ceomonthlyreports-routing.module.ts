import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CeomonthlyreportsPage } from './ceomonthlyreports.page';

const routes: Routes = [
  {
    path: '',
    component: CeomonthlyreportsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CeomonthlyreportsPageRoutingModule {}
