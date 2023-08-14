import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuoteapprovalPage } from './quoteapproval.page';

const routes: Routes = [
  {
    path: '',
    component: QuoteapprovalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuoteapprovalPageRoutingModule {}
