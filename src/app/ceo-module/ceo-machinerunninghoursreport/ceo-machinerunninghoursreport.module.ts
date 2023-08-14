import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CeoMachinerunninghoursreportPageRoutingModule } from './ceo-machinerunninghoursreport-routing.module';

import { CeoMachinerunninghoursreportPage } from './ceo-machinerunninghoursreport.page';

import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    CeoMachinerunninghoursreportPageRoutingModule
  ],
  declarations: [CeoMachinerunninghoursreportPage]
})
export class CeoMachinerunninghoursreportPageModule {}
