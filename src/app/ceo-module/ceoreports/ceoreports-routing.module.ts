import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CeoreportsPage } from './ceoreports.page';

const routes: Routes = [
  {
    path: '',
    component: CeoreportsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CeoreportsPageRoutingModule {}
