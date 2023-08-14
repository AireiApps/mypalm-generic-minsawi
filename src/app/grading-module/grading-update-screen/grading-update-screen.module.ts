import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GradingUpdateScreenPageRoutingModule } from './grading-update-screen-routing.module';

import { GradingUpdateScreenPage } from './grading-update-screen.page';

import { TranslateModule } from "@ngx-translate/core";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    TranslateModule,
    GradingUpdateScreenPageRoutingModule
  ],
  declarations: [GradingUpdateScreenPage]
})
export class GradingUpdateScreenPageModule {}
