import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LogsheetPressstationEditPage } from './logsheet-pressstation-edit.page';

const routes: Routes = [
  {
    path: '',
    component: LogsheetPressstationEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LogsheetPressstationEditPageRoutingModule {}
