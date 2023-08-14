import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CeomonthlyreportsPageRoutingModule } from './ceomonthlyreports-routing.module';

import { CeomonthlyreportsPage } from './ceomonthlyreports.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CeomonthlyreportsPageRoutingModule
  ],
  declarations: [CeomonthlyreportsPage]
})
export class CeomonthlyreportsPageModule {}
