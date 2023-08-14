import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TraceabilityreportPageRoutingModule } from './traceabilityreport-routing.module';

import { TraceabilityreportPage } from './traceabilityreport.page';

import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    TraceabilityreportPageRoutingModule
  ],
  declarations: [TraceabilityreportPage]
})
export class TraceabilityreportPageModule {}
