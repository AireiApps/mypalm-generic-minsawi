import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CeocommunicationPageRoutingModule } from './ceocommunication-routing.module';

import { CeocommunicationPage } from './ceocommunication.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    CeocommunicationPageRoutingModule
  ],
  declarations: [CeocommunicationPage]
})
export class CeocommunicationPageModule {}
