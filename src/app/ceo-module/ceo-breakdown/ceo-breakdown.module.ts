import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CeoBreakdownPageRoutingModule } from './ceo-breakdown-routing.module';

import { CeoBreakdownPage } from './ceo-breakdown.page';

import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    CeoBreakdownPageRoutingModule
  ],
  declarations: [CeoBreakdownPage]
})
export class CeoBreakdownPageModule {}
