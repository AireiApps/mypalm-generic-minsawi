import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CeoProductionandmaintenancechecklistreportPageRoutingModule } from './ceo-productionandmaintenancechecklistreport-routing.module';

import { CeoProductionandmaintenancechecklistreportPage } from './ceo-productionandmaintenancechecklistreport.page';

import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    CeoProductionandmaintenancechecklistreportPageRoutingModule
  ],
  declarations: [CeoProductionandmaintenancechecklistreportPage]
})
export class CeoProductionandmaintenancechecklistreportPageModule {}
