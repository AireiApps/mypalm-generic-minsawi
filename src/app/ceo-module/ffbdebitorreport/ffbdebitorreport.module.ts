import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FfbdebitorreportPageRoutingModule } from './ffbdebitorreport-routing.module';

import { FfbdebitorreportPage } from './ffbdebitorreport.page';

import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    FfbdebitorreportPageRoutingModule
  ],
  declarations: [FfbdebitorreportPage]
})
export class FfbdebitorreportPageModule {}
