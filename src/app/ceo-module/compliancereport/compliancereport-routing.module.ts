import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompliancereportPage } from './compliancereport.page';

const routes: Routes = [
  {
    path: '',
    component: CompliancereportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompliancereportPageRoutingModule {}
