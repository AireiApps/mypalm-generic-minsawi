import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CeoGradingreportPageRoutingModule } from './ceo-gradingreport-routing.module';

import { CeoGradingreportPage } from './ceo-gradingreport.page';

import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    CeoGradingreportPageRoutingModule
  ],
  declarations: [CeoGradingreportPage]
})
export class CeoGradingreportPageModule {}
