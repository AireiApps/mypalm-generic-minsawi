import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CeoUserlogreportPage } from './ceo-userlogreport.page';

const routes: Routes = [
  {
    path: '',
    component: CeoUserlogreportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CeoUserlogreportPageRoutingModule {}
