import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SustainchecklistPageRoutingModule } from './sustainchecklist-routing.module';

import { SustainchecklistPage } from './sustainchecklist.page';

import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    SustainchecklistPageRoutingModule
  ],
  declarations: [SustainchecklistPage]
})
export class SustainchecklistPageModule {}
