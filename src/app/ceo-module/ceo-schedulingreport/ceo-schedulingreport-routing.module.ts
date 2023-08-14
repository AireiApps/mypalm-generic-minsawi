import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CeoSchedulingreportPage } from './ceo-schedulingreport.page';

const routes: Routes = [
  {
    path: '',
    component: CeoSchedulingreportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CeoSchedulingreportPageRoutingModule {}
