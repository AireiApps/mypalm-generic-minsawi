import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OnehourentryPage } from './onehourentry.page';

const routes: Routes = [
  {
    path: '',
    component: OnehourentryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OnehourentryPageRoutingModule {}
