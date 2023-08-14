import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MillreportPage } from './millreport.page';

const routes: Routes = [
  {
    path: '',
    component: MillreportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MillreportPageRoutingModule {}
