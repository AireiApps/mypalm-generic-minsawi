import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CeoUseractivityHomePage } from './ceo-useractivity-home.page';

const routes: Routes = [
  {
    path: '',
    component: CeoUseractivityHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CeoUseractivityHomePageRoutingModule {}
