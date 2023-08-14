import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CeoMillperformancereportPage } from './ceo-millperformancereport.page';

const routes: Routes = [
  {
    path: '',
    component: CeoMillperformancereportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CeoMillperformancereportPageRoutingModule {}
