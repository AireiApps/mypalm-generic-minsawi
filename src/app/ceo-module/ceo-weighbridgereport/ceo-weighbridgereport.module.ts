import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CeoWeighbridgereportPageRoutingModule } from './ceo-weighbridgereport-routing.module';

import { CeoWeighbridgereportPage } from './ceo-weighbridgereport.page';

import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    CeoWeighbridgereportPageRoutingModule
  ],
  declarations: [CeoWeighbridgereportPage]
})
export class CeoWeighbridgereportPageModule {}
