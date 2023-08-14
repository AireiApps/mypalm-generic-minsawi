import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PkDispatchReportPageRoutingModule } from './pk-dispatch-report-routing.module';

import { PkDispatchReportPage } from './pk-dispatch-report.page';

import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    PkDispatchReportPageRoutingModule
  ],
  declarations: [PkDispatchReportPage]
})
export class PkDispatchReportPageModule {}
