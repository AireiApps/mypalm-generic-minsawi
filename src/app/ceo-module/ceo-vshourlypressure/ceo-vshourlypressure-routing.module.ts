import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CeoVshourlypressurePage } from './ceo-vshourlypressure.page';

const routes: Routes = [
  {
    path: '',
    component: CeoVshourlypressurePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CeoVshourlypressurePageRoutingModule {}
