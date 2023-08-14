import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductiontimelinehomePageRoutingModule } from './productiontimelinehome-routing.module';

import { ProductiontimelinehomePage } from './productiontimelinehome.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductiontimelinehomePageRoutingModule
  ],
  declarations: [ProductiontimelinehomePage]
})
export class ProductiontimelinehomePageModule {}
