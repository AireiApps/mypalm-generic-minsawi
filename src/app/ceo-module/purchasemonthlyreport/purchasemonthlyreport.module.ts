import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PurchasemonthlyreportPageRoutingModule } from './purchasemonthlyreport-routing.module';

import { PurchasemonthlyreportPage } from './purchasemonthlyreport.page';

import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    PurchasemonthlyreportPageRoutingModule
  ],
  declarations: [PurchasemonthlyreportPage]
})
export class PurchasemonthlyreportPageModule {}
