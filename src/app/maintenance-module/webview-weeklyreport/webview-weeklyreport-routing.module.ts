import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WebviewWeeklyreportPage } from './webview-weeklyreport.page';

const routes: Routes = [
  {
    path: '',
    component: WebviewWeeklyreportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WebviewWeeklyreportPageRoutingModule {}
