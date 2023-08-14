import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CeoUseractivityHomePageRoutingModule } from './ceo-useractivity-home-routing.module';

import { CeoUseractivityHomePage } from './ceo-useractivity-home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CeoUseractivityHomePageRoutingModule
  ],
  declarations: [CeoUseractivityHomePage]
})
export class CeoUseractivityHomePageModule {}
