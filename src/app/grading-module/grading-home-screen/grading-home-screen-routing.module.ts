import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GradingHomeScreenPage } from './grading-home-screen.page';

const routes: Routes = [
  {
    path: '',
    component: GradingHomeScreenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GradingHomeScreenPageRoutingModule {}
