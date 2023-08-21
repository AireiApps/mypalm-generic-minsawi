import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FourhoursentryPageRoutingModule } from './fourhoursentry-routing.module';

import { FourhoursentryPage } from './fourhoursentry.page';

import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TranslateModule,
    FourhoursentryPageRoutingModule
  ],
  declarations: [FourhoursentryPage]
})
export class FourhoursentryPageModule {}
