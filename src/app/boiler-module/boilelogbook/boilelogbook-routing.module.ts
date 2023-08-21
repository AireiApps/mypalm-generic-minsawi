import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BoilelogbookPage } from './boilelogbook.page';

const routes: Routes = [
  {
    path: '',
    component: BoilelogbookPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoilelogbookPageRoutingModule {}
