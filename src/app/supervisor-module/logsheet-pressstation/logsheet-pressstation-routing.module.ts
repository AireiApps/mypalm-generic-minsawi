import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LogsheetPressstationPage } from './logsheet-pressstation.page';

const routes: Routes = [
  {
    path: '',
    component: LogsheetPressstationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LogsheetPressstationPageRoutingModule {}
