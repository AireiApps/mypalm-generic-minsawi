import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CeoGradingreportPage } from './ceo-gradingreport.page';

const routes: Routes = [
  {
    path: '',
    component: CeoGradingreportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CeoGradingreportPageRoutingModule {}
