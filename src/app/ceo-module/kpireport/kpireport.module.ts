import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KpireportPageRoutingModule } from './kpireport-routing.module';

import { KpireportPage } from './kpireport.page';

import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    KpireportPageRoutingModule
  ],
  declarations: [KpireportPage]
})
export class KpireportPageModule {}
