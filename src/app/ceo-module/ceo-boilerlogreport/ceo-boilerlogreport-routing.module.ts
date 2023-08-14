import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CeoBoilerlogreportPage } from './ceo-boilerlogreport.page';

const routes: Routes = [
  {
    path: '',
    component: CeoBoilerlogreportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CeoBoilerlogreportPageRoutingModule {}
