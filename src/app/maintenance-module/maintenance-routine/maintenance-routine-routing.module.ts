import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaintenanceRoutinePage } from './maintenance-routine.page';

const routes: Routes = [
  {
    path: '',
    component: MaintenanceRoutinePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaintenanceRoutinePageRoutingModule {}
