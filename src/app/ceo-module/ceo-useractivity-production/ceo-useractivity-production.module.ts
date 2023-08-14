import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CeoUseractivityProductionPageRoutingModule } from './ceo-useractivity-production-routing.module';

import { CeoUseractivityProductionPage } from './ceo-useractivity-production.page';

import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    CeoUseractivityProductionPageRoutingModule
  ],
  declarations: [CeoUseractivityProductionPage]
})
export class CeoUseractivityProductionPageModule {}
