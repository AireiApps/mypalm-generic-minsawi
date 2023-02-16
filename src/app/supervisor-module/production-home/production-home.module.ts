import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductionHomePageRoutingModule } from './production-home-routing.module';

import { ProductionHomePage } from './production-home.page';

import { TranslateModule } from "@ngx-translate/core";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ProductionHomePageRoutingModule
  ],
  declarations: [ProductionHomePage]
})
export class ProductionHomePageModule {}
