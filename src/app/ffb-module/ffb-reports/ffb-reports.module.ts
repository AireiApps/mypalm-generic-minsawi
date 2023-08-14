import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FfbReportsPageRoutingModule } from './ffb-reports-routing.module';

import { FfbReportsPage } from './ffb-reports.page';

import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ReactiveFormsModule,
    FfbReportsPageRoutingModule
  ],
  declarations: [FfbReportsPage]
})
export class FfbReportsPageModule {}
