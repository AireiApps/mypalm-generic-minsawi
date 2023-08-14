import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CeocommunicationPage } from './ceocommunication.page';

const routes: Routes = [
  {
    path: '',
    component: CeocommunicationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CeocommunicationPageRoutingModule {}
