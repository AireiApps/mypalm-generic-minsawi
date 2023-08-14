import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CeosupervisormillcommentsPage } from './ceosupervisormillcomments.page';

const routes: Routes = [
  {
    path: '',
    component: CeosupervisormillcommentsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CeosupervisormillcommentsPageRoutingModule {}
