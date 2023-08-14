import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FfbcreditorsreportPageRoutingModule } from './ffbcreditorsreport-routing.module';

import { FfbcreditorsreportPage } from './ffbcreditorsreport.page';

import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    FfbcreditorsreportPageRoutingModule
  ],
  declarations: [FfbcreditorsreportPage]
})
export class FfbcreditorsreportPageModule {}
