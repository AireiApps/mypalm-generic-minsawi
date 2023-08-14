import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManagertabSorscreenPage } from './managertab-sorscreen.page';

const routes: Routes = [
  {
    path: '',
    component: ManagertabSorscreenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagertabSorscreenPageRoutingModule {}
