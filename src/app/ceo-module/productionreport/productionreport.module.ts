import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductionreportPageRoutingModule } from './productionreport-routing.module';

import { ProductionreportPage } from './productionreport.page';

import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ProductionreportPageRoutingModule
  ],
  declarations: [ProductionreportPage]
})
export class ProductionreportPageModule {}
