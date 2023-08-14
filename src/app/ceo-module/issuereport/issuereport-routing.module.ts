import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IssuereportPage } from './issuereport.page';

const routes: Routes = [
  {
    path: '',
    component: IssuereportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IssuereportPageRoutingModule {}
