import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KpireportPage } from './kpireport.page';

const routes: Routes = [
  {
    path: '',
    component: KpireportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KpireportPageRoutingModule {}
