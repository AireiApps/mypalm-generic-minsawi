import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportMachineryrunninghourPageRoutingModule } from './report-machineryrunninghour-routing.module';

import { ReportMachineryrunninghourPage } from './report-machineryrunninghour.page';
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    ReactiveFormsModule,
    IonicModule,
    ReportMachineryrunninghourPageRoutingModule
  ],
  declarations: [ReportMachineryrunninghourPage]
})
export class ReportMachineryrunninghourPageModule {}
