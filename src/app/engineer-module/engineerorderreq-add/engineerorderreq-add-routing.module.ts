import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EngineerorderreqAddPage } from './engineerorderreq-add.page';

const routes: Routes = [
  {
    path: '',
    component: EngineerorderreqAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EngineerorderreqAddPageRoutingModule {}
