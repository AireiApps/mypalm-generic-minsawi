import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CeoFinancialreportsHomePageRoutingModule } from './ceo-financialreports-home-routing.module';

import { CeoFinancialreportsHomePage } from './ceo-financialreports-home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CeoFinancialreportsHomePageRoutingModule
  ],
  declarations: [CeoFinancialreportsHomePage]
})
export class CeoFinancialreportsHomePageModule {}
