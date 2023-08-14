import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LivetrackingreportPageRoutingModule } from './livetrackingreport-routing.module';

import { LivetrackingreportPage } from './livetrackingreport.page';

import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    LivetrackingreportPageRoutingModule
  ],
  declarations: [LivetrackingreportPage]
})
export class LivetrackingreportPageModule {}
