import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CeoUserlogreportPageRoutingModule } from './ceo-userlogreport-routing.module';

import { CeoUserlogreportPage } from './ceo-userlogreport.page';

import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    CeoUserlogreportPageRoutingModule
  ],
  declarations: [CeoUserlogreportPage]
})
export class CeoUserlogreportPageModule {}
