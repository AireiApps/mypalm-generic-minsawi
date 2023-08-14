import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DailyexpensereportPageRoutingModule } from './dailyexpensereport-routing.module';

import { DailyexpensereportPage } from './dailyexpensereport.page';

import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    DailyexpensereportPageRoutingModule
  ],
  declarations: [DailyexpensereportPage]
})
export class DailyexpensereportPageModule {}
