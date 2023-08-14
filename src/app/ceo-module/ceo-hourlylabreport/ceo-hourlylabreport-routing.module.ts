import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CeoHourlylabreportPage } from './ceo-hourlylabreport.page';

const routes: Routes = [
  {
    path: '',
    component: CeoHourlylabreportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CeoHourlylabreportPageRoutingModule {}
