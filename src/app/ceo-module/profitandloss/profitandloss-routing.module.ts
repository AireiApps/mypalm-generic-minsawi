import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfitandlossPage } from './profitandloss.page';

const routes: Routes = [
  {
    path: '',
    component: ProfitandlossPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfitandlossPageRoutingModule {}
