import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EngineerorderreqlistPage } from './engineerorderreqlist.page';

const routes: Routes = [
  {
    path: '',
    component: EngineerorderreqlistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EngineerorderreqlistPageRoutingModule {}
