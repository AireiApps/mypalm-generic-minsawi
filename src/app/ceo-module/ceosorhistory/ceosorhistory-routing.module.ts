import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CeosorhistoryPage } from './ceosorhistory.page';

const routes: Routes = [
  {
    path: '',
    component: CeosorhistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CeosorhistoryPageRoutingModule {}
