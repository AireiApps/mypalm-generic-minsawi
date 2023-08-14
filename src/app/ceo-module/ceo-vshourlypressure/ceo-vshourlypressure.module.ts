import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CeoVshourlypressurePageRoutingModule } from './ceo-vshourlypressure-routing.module';

import { CeoVshourlypressurePage } from './ceo-vshourlypressure.page';

import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    CeoVshourlypressurePageRoutingModule
  ],
  declarations: [CeoVshourlypressurePage]
})
export class CeoVshourlypressurePageModule {}
