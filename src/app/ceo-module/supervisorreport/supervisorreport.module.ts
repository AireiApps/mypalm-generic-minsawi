import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SupervisorreportPageRoutingModule } from './supervisorreport-routing.module';

import { SupervisorreportPage } from './supervisorreport.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SupervisorreportPageRoutingModule
  ],
  declarations: [SupervisorreportPage]
})
export class SupervisorreportPageModule {}
