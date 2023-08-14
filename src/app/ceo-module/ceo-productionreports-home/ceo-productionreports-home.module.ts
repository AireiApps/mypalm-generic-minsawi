import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CeoProductionreportsHomePageRoutingModule } from './ceo-productionreports-home-routing.module';

import { CeoProductionreportsHomePage } from './ceo-productionreports-home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CeoProductionreportsHomePageRoutingModule
  ],
  declarations: [CeoProductionreportsHomePage]
})
export class CeoProductionreportsHomePageModule {}
