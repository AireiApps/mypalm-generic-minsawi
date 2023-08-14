import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CeoVsinformationcyclePage } from './ceo-vsinformationcycle.page';

const routes: Routes = [
  {
    path: '',
    component: CeoVsinformationcyclePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CeoVsinformationcyclePageRoutingModule {}
