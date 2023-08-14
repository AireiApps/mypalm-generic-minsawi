import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CeoDailylabreportPageRoutingModule } from './ceo-dailylabreport-routing.module';

import { CeoDailylabreportPage } from './ceo-dailylabreport.page';

import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    CeoDailylabreportPageRoutingModule
  ],
  declarations: [CeoDailylabreportPage]
})
export class CeoDailylabreportPageModule {}
