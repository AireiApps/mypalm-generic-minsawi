import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LogsheetPressstationEditPageRoutingModule } from './logsheet-pressstation-edit-routing.module';

import { LogsheetPressstationEditPage } from './logsheet-pressstation-edit.page';

import { TranslateModule } from "@ngx-translate/core";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TranslateModule,
    LogsheetPressstationEditPageRoutingModule
  ],
  declarations: [LogsheetPressstationEditPage]
})
export class LogsheetPressstationEditPageModule {}
