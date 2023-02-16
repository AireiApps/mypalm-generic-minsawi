import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LogsheetSterilizerstationPage } from './logsheet-sterilizerstation.page';

const routes: Routes = [
  {
    path: '',
    component: LogsheetSterilizerstationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LogsheetSterilizerstationPageRoutingModule {}
