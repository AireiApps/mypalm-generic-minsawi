import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CeoHourlyreportPage } from './ceo-hourlyreport.page';

const routes: Routes = [
  {
    path: '',
    component: CeoHourlyreportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CeoHourlyreportPageRoutingModule {}
