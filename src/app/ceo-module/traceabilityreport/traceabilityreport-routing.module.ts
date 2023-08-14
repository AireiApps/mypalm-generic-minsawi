import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TraceabilityreportPage } from './traceabilityreport.page';

const routes: Routes = [
  {
    path: '',
    component: TraceabilityreportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TraceabilityreportPageRoutingModule {}
