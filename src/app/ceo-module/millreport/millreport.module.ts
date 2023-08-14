import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MillreportPageRoutingModule } from './millreport-routing.module';

import { MillreportPage } from './millreport.page';

import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    MillreportPageRoutingModule
  ],
  declarations: [MillreportPage]
})
export class MillreportPageModule {}
