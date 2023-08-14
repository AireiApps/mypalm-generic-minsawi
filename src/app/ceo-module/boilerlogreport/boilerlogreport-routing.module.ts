import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BoilerlogreportPage } from './boilerlogreport.page';

const routes: Routes = [
  {
    path: '',
    component: BoilerlogreportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoilerlogreportPageRoutingModule {}
