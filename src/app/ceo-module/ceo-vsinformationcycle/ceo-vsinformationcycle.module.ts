import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CeoVsinformationcyclePageRoutingModule } from './ceo-vsinformationcycle-routing.module';

import { CeoVsinformationcyclePage } from './ceo-vsinformationcycle.page';

import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    CeoVsinformationcyclePageRoutingModule
  ],
  declarations: [CeoVsinformationcyclePage]
})
export class CeoVsinformationcyclePageModule {}
