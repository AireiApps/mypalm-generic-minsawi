import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CeodashboardPageRoutingModule } from './ceodashboard-routing.module';

import { CeodashboardPage } from './ceodashboard.page';

import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    CeodashboardPageRoutingModule
  ],
  declarations: [CeodashboardPage]
})
export class CeodashboardPageModule {}
