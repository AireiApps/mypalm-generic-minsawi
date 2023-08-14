import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CeoHourlylabreportPageRoutingModule } from './ceo-hourlylabreport-routing.module';

import { CeoHourlylabreportPage } from './ceo-hourlylabreport.page';

import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    IonicModule,
    CeoHourlylabreportPageRoutingModule
  ],
  declarations: [CeoHourlylabreportPage]
})
export class CeoHourlylabreportPageModule {}
