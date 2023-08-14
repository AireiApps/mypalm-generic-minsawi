import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CashflowstatementreportPageRoutingModule } from './cashflowstatementreport-routing.module';

import { CashflowstatementreportPage } from './cashflowstatementreport.page';

import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    CashflowstatementreportPageRoutingModule
  ],
  declarations: [CashflowstatementreportPage]
})
export class CashflowstatementreportPageModule {}
