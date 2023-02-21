import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GradingHomePage } from './grading-home.page';

const routes: Routes = [
  {
    path: '',
    component: GradingHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GradingHomePageRoutingModule {}
