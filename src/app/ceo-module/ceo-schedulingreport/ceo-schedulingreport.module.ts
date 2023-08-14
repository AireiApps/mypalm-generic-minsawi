import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CeoSchedulingreportPageRoutingModule } from './ceo-schedulingreport-routing.module';

import { CeoSchedulingreportPage } from './ceo-schedulingreport.page';

import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    CeoSchedulingreportPageRoutingModule
  ],
  declarations: [CeoSchedulingreportPage]
})
export class CeoSchedulingreportPageModule {}
