import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CeoreportsPageRoutingModule } from './ceoreports-routing.module';

import { CeoreportsPage } from './ceoreports.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CeoreportsPageRoutingModule
  ],
  declarations: [CeoreportsPage]
})
export class CeoreportsPageModule {}
