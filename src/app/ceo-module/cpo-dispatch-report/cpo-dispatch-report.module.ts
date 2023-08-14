import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CpoDispatchReportPageRoutingModule } from './cpo-dispatch-report-routing.module';

import { CpoDispatchReportPage } from './cpo-dispatch-report.page';

import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    CpoDispatchReportPageRoutingModule
  ],
  declarations: [CpoDispatchReportPage]
})
export class CpoDispatchReportPageModule {}
