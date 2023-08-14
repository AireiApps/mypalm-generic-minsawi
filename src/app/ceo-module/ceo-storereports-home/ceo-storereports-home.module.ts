import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CeoStorereportsHomePageRoutingModule } from './ceo-storereports-home-routing.module';

import { CeoStorereportsHomePage } from './ceo-storereports-home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CeoStorereportsHomePageRoutingModule
  ],
  declarations: [CeoStorereportsHomePage]
})
export class CeoStorereportsHomePageModule {}
