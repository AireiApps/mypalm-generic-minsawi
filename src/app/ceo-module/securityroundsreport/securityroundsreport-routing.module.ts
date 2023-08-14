import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SecurityroundsreportPage } from './securityroundsreport.page';

const routes: Routes = [
  {
    path: '',
    component: SecurityroundsreportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SecurityroundsreportPageRoutingModule {}
