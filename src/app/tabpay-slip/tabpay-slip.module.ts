import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabpaySlipPageRoutingModule } from './tabpay-slip-routing.module';

import { TabpaySlipPage } from './tabpay-slip.page';

import { TranslateModule } from "@ngx-translate/core";

import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    SharedModule,
    TabpaySlipPageRoutingModule
  ],
  declarations: [TabpaySlipPage]
})
export class TabpaySlipPageModule {}
