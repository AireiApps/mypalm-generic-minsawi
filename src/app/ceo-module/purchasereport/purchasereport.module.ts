import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PurchasereportPageRoutingModule } from './purchasereport-routing.module';

import { PurchasereportPage } from './purchasereport.page';

import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    PurchasereportPageRoutingModule
  ],
  declarations: [PurchasereportPage]
})
export class PurchasereportPageModule {}
