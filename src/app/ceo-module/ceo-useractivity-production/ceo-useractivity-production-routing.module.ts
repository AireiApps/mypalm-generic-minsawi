import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CeoUseractivityProductionPage } from './ceo-useractivity-production.page';

const routes: Routes = [
  {
    path: '',
    component: CeoUseractivityProductionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CeoUseractivityProductionPageRoutingModule {}
