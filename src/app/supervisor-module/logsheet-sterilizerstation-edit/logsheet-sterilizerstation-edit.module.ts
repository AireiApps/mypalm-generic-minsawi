import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LogsheetSterilizerstationEditPageRoutingModule } from './logsheet-sterilizerstation-edit-routing.module';

import { LogsheetSterilizerstationEditPage } from './logsheet-sterilizerstation-edit.page';

import { TranslateModule } from "@ngx-translate/core";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TranslateModule,
    LogsheetSterilizerstationEditPageRoutingModule
  ],
  declarations: [LogsheetSterilizerstationEditPage]
})
export class LogsheetSterilizerstationEditPageModule {}
