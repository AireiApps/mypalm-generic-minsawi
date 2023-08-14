import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FfbcreditorsreportPage } from './ffbcreditorsreport.page';

const routes: Routes = [
  {
    path: '',
    component: FfbcreditorsreportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FfbcreditorsreportPageRoutingModule {}
