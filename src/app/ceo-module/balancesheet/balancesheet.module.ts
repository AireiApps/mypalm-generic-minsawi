import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BalancesheetPageRoutingModule } from './balancesheet-routing.module';

import { BalancesheetPage } from './balancesheet.page';

import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    BalancesheetPageRoutingModule
  ],
  declarations: [BalancesheetPage]
})
export class BalancesheetPageModule {}
