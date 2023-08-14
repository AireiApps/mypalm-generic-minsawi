import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GradingHomescreen2Page } from './grading-homescreen2.page';

const routes: Routes = [
  {
    path: '',
    component: GradingHomescreen2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GradingHomescreen2PageRoutingModule {}
