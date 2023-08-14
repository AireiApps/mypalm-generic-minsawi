import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabSorscreenPage } from './tab-sorscreen.page';

const routes: Routes = [
  {
    path: '',
    component: TabSorscreenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabSorscreenPageRoutingModule {}
