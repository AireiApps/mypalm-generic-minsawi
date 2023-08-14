import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CeoGradingreportsHomePageRoutingModule } from './ceo-gradingreports-home-routing.module';

import { CeoGradingreportsHomePage } from './ceo-gradingreports-home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CeoGradingreportsHomePageRoutingModule
  ],
  declarations: [CeoGradingreportsHomePage]
})
export class CeoGradingreportsHomePageModule {}
