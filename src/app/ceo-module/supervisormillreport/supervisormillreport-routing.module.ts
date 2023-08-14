import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SupervisormillreportPage } from './supervisormillreport.page';

const routes: Routes = [
  {
    path: '',
    component: SupervisormillreportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SupervisormillreportPageRoutingModule {}
