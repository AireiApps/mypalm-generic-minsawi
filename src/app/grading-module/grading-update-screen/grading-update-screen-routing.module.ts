import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GradingUpdateScreenPage } from './grading-update-screen.page';

const routes: Routes = [
  {
    path: '',
    component: GradingUpdateScreenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GradingUpdateScreenPageRoutingModule {}
