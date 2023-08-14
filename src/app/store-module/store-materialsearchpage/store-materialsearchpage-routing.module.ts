import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StoreMaterialsearchpagePage } from './store-materialsearchpage.page';

const routes: Routes = [
  {
    path: '',
    component: StoreMaterialsearchpagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoreMaterialsearchpagePageRoutingModule {}
