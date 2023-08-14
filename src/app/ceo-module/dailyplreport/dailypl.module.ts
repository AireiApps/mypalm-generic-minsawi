import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DailyplPageRoutingModule } from './dailypl-routing.module';

import { DailyplPage } from './dailypl.page';

import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    DailyplPageRoutingModule
  ],
  declarations: [DailyplPage]
})
export class DailyplPageModule {}
