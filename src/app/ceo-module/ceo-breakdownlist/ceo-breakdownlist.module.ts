import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CeoBreakdownlistPageRoutingModule } from './ceo-breakdownlist-routing.module';

import { CeoBreakdownlistPage } from './ceo-breakdownlist.page';

import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    CeoBreakdownlistPageRoutingModule
  ],
  declarations: [CeoBreakdownlistPage]
})
export class CeoBreakdownlistPageModule {}
