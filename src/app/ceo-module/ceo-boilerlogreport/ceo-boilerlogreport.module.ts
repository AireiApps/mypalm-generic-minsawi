import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CeoBoilerlogreportPageRoutingModule } from './ceo-boilerlogreport-routing.module';

import { CeoBoilerlogreportPage } from './ceo-boilerlogreport.page';

import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    CeoBoilerlogreportPageRoutingModule
  ],
  declarations: [CeoBoilerlogreportPage]
})
export class CeoBoilerlogreportPageModule {}
