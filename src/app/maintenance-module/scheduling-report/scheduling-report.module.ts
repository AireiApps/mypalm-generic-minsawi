import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SchedulingReportPageRoutingModule } from './scheduling-report-routing.module';

import { SchedulingReportPage } from './scheduling-report.page';

import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    SchedulingReportPageRoutingModule
  ],
  declarations: [SchedulingReportPage]
})
export class SchedulingReportPageModule {}
