import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CeosorhistoryPageRoutingModule } from './ceosorhistory-routing.module';

import { CeosorhistoryPage } from './ceosorhistory.page';

import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    CeosorhistoryPageRoutingModule
  ],
  declarations: [CeosorhistoryPage]
})
export class CeosorhistoryPageModule {}
