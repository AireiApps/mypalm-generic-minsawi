import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SorreportPageRoutingModule } from './sorreport-routing.module';

import { SorreportPage } from './sorreport.page';

import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    SorreportPageRoutingModule
  ],
  declarations: [SorreportPage]
})
export class SorreportPageModule {}
