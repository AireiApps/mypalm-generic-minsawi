import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AbcdreportPage } from './abcdreport.page';

const routes: Routes = [
  {
    path: '',
    component: AbcdreportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AbcdreportPageRoutingModule {}
