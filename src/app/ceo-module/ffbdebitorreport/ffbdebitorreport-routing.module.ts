import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FfbdebitorreportPage } from './ffbdebitorreport.page';

const routes: Routes = [
  {
    path: '',
    component: FfbdebitorreportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FfbdebitorreportPageRoutingModule {}
