import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LogsheetSterilizerstationPageRoutingModule } from './logsheet-sterilizerstation-routing.module';

import { LogsheetSterilizerstationPage } from './logsheet-sterilizerstation.page';

import { TranslateModule } from "@ngx-translate/core";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TranslateModule,
    LogsheetSterilizerstationPageRoutingModule
  ],
  declarations: [LogsheetSterilizerstationPage]
})
export class LogsheetSterilizerstationPageModule {}
