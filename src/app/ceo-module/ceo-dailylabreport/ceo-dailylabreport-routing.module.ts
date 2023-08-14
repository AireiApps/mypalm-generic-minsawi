import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CeoDailylabreportPage } from './ceo-dailylabreport.page';

const routes: Routes = [
  {
    path: '',
    component: CeoDailylabreportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CeoDailylabreportPageRoutingModule {}
