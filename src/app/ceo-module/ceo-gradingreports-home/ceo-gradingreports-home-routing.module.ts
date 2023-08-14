import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CeoGradingreportsHomePage } from './ceo-gradingreports-home.page';

const routes: Routes = [
  {
    path: '',
    component: CeoGradingreportsHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CeoGradingreportsHomePageRoutingModule {}
