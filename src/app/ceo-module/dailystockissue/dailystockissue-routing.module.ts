import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DailystockissuePage } from './dailystockissue.page';

const routes: Routes = [
  {
    path: '',
    component: DailystockissuePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DailystockissuePageRoutingModule {}
