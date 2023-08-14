import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CeoHourlyreportPageRoutingModule } from './ceo-hourlyreport-routing.module';

import { CeoHourlyreportPage } from './ceo-hourlyreport.page';

import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    CeoHourlyreportPageRoutingModule
  ],
  declarations: [CeoHourlyreportPage]
})
export class CeoHourlyreportPageModule {}
