import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportMachineryrunninghourPage } from './report-machineryrunninghour.page';

const routes: Routes = [
  {
    path: '',
    component: ReportMachineryrunninghourPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportMachineryrunninghourPageRoutingModule {}
