import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StoreCheckPagePageRoutingModule } from './store-check-page-routing.module';

import { StoreCheckPagePage } from './store-check-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    StoreCheckPagePageRoutingModule
  ],
  declarations: [StoreCheckPagePage]
})
export class StoreCheckPagePageModule {}
