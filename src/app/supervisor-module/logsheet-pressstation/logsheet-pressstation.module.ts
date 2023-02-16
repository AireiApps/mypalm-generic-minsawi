import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LogsheetPressstationPageRoutingModule } from './logsheet-pressstation-routing.module';

import { LogsheetPressstationPage } from './logsheet-pressstation.page';

import { TranslateModule } from "@ngx-translate/core";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TranslateModule,
    LogsheetPressstationPageRoutingModule
  ],
  declarations: [LogsheetPressstationPage]
})
export class LogsheetPressstationPageModule {}
