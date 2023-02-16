import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaintenanceHistoryTimelinePage } from './maintenance-history-timeline.page';

const routes: Routes = [
  {
    path: '',
    component: MaintenanceHistoryTimelinePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaintenanceHistoryTimelinePageRoutingModule {}
