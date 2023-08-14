import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EngineersorhistoryPage } from './engineersorhistory.page';

const routes: Routes = [
  {
    path: '',
    component: EngineersorhistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EngineersorhistoryPageRoutingModule {}
