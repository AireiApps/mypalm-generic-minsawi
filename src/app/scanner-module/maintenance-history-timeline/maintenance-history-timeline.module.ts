import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MaintenanceHistoryTimelinePageRoutingModule } from './maintenance-history-timeline-routing.module';

import { MaintenanceHistoryTimelinePage } from './maintenance-history-timeline.page';

import { TranslateModule } from "@ngx-translate/core";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    MaintenanceHistoryTimelinePageRoutingModule
  ],
  declarations: [MaintenanceHistoryTimelinePage]
})
export class MaintenanceHistoryTimelinePageModule {}
