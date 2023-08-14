import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CeoMaintenancereportsHomePageRoutingModule } from './ceo-maintenancereports-home-routing.module';

import { CeoMaintenancereportsHomePage } from './ceo-maintenancereports-home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CeoMaintenancereportsHomePageRoutingModule
  ],
  declarations: [CeoMaintenancereportsHomePage]
})
export class CeoMaintenancereportsHomePageModule {}
