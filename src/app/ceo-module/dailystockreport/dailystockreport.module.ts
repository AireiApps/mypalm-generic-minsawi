import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DailystockreportPageRoutingModule } from './dailystockreport-routing.module';

import { DailystockreportPage } from './dailystockreport.page';

import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    DailystockreportPageRoutingModule
  ],
  declarations: [DailystockreportPage]
})
export class DailystockreportPageModule {}
