import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CeoMachinerunninghoursreportPage } from './ceo-machinerunninghoursreport.page';

const routes: Routes = [
  {
    path: '',
    component: CeoMachinerunninghoursreportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CeoMachinerunninghoursreportPageRoutingModule {}
