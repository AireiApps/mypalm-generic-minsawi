import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TwohoursentryPageRoutingModule } from './twohoursentry-routing.module';

import { TwohoursentryPage } from './twohoursentry.page';

import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TranslateModule,
    TwohoursentryPageRoutingModule
  ],
  declarations: [TwohoursentryPage]
})
export class TwohoursentryPageModule {}
