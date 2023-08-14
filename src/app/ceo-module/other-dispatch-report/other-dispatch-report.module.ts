import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OtherDispatchReportPageRoutingModule } from './other-dispatch-report-routing.module';

import { OtherDispatchReportPage } from './other-dispatch-report.page';

import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    OtherDispatchReportPageRoutingModule
  ],
  declarations: [OtherDispatchReportPage]
})
export class OtherDispatchReportPageModule {}
