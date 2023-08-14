import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MmslogreportPage } from './mmslogreport.page';

const routes: Routes = [
  {
    path: '',
    component: MmslogreportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MmslogreportPageRoutingModule {}
