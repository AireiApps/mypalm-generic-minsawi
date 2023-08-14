import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CeoDailyreportsPageRoutingModule } from './ceo-dailyreports-routing.module';

import { CeoDailyreportsPage } from './ceo-dailyreports.page';

import { TranslateModule } from "@ngx-translate/core";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    CeoDailyreportsPageRoutingModule
  ],
  declarations: [CeoDailyreportsPage]
})
export class CeoDailyreportsPageModule {}
