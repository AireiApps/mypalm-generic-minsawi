import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StoreDetailsscreenPageRoutingModule } from './store-detailsscreen-routing.module';

import { StoreDetailsscreenPage } from './store-detailsscreen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StoreDetailsscreenPageRoutingModule
  ],
  declarations: [StoreDetailsscreenPage]
})
export class StoreDetailsscreenPageModule {}
