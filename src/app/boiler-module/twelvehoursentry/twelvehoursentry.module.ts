import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TwelvehoursentryPageRoutingModule } from './twelvehoursentry-routing.module';

import { TwelvehoursentryPage } from './twelvehoursentry.page';

import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TranslateModule,
    TwelvehoursentryPageRoutingModule
  ],
  declarations: [TwelvehoursentryPage]
})
export class TwelvehoursentryPageModule {}
