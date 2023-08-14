import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MonthlyffbcreditorsreportPageRoutingModule } from './monthlyffbcreditorsreport-routing.module';

import { MonthlyffbcreditorsreportPage } from './monthlyffbcreditorsreport.page';

import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    MonthlyffbcreditorsreportPageRoutingModule
  ],
  declarations: [MonthlyffbcreditorsreportPage]
})
export class MonthlyffbcreditorsreportPageModule {}
