import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HealthreportPageRoutingModule } from './healthreport-routing.module';

import { HealthreportPage } from './healthreport.page';

import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    HealthreportPageRoutingModule
  ],
  declarations: [HealthreportPage]
})
export class HealthreportPageModule {}
