import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BoilerlogreportPageRoutingModule } from './boilerlogreport-routing.module';

import { BoilerlogreportPage } from './boilerlogreport.page';

import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    BoilerlogreportPageRoutingModule
  ],
  declarations: [BoilerlogreportPage]
})
export class BoilerlogreportPageModule {}
