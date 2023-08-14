import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MmslogreportPageRoutingModule } from './mmslogreport-routing.module';

import { MmslogreportPage } from './mmslogreport.page';

import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    MmslogreportPageRoutingModule
  ],
  declarations: [MmslogreportPage]
})
export class MmslogreportPageModule {}
