import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EngineersorhistoryPageRoutingModule } from './engineersorhistory-routing.module';

import { EngineersorhistoryPage } from './engineersorhistory.page';

import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    EngineersorhistoryPageRoutingModule
  ],
  declarations: [EngineersorhistoryPage]
})
export class EngineersorhistoryPageModule {}
