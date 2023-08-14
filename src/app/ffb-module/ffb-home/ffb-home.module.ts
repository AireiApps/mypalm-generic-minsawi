import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FfbHomePageRoutingModule } from './ffb-home-routing.module';

import { FfbHomePage } from './ffb-home.page';

import { Ng2SearchPipeModule } from "ng2-search-filter";

import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    TranslateModule,
    Ng2SearchPipeModule,
    FfbHomePageRoutingModule
  ],
  declarations: [FfbHomePage]
})
export class FfbHomePageModule {}
