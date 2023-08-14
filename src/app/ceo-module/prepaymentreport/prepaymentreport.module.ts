import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrepaymentreportPageRoutingModule } from './prepaymentreport-routing.module';

import { PrepaymentreportPage } from './prepaymentreport.page';

import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    PrepaymentreportPageRoutingModule
  ],
  declarations: [PrepaymentreportPage]
})
export class PrepaymentreportPageModule {}
