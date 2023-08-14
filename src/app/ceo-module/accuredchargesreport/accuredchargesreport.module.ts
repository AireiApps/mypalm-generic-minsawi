import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccuredchargesreportPageRoutingModule } from './accuredchargesreport-routing.module';

import { AccuredchargesreportPage } from './accuredchargesreport.page';

import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    AccuredchargesreportPageRoutingModule
  ],
  declarations: [AccuredchargesreportPage]
})
export class AccuredchargesreportPageModule {}
