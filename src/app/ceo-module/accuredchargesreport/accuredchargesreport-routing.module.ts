import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccuredchargesreportPage } from './accuredchargesreport.page';

const routes: Routes = [
  {
    path: '',
    component: AccuredchargesreportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccuredchargesreportPageRoutingModule {}
