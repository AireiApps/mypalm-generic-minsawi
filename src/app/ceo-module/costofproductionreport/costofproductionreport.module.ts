import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CostofproductionreportPageRoutingModule } from './costofproductionreport-routing.module';

import { CostofproductionreportPage } from './costofproductionreport.page';

import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    CostofproductionreportPageRoutingModule
  ],
  declarations: [CostofproductionreportPage]
})
export class CostofproductionreportPageModule {}
