import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BoilerlevelsPageRoutingModule } from './boilerlevels-routing.module';

import { BoilerlevelsPage } from './boilerlevels.page';

import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TranslateModule,
    BoilerlevelsPageRoutingModule
  ],
  declarations: [BoilerlevelsPage]
})
export class BoilerlevelsPageModule {}
