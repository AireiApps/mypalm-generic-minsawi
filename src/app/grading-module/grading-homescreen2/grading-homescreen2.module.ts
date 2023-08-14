import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GradingHomescreen2PageRoutingModule } from './grading-homescreen2-routing.module';

import { GradingHomescreen2Page } from './grading-homescreen2.page';

import { Ng2SearchPipeModule } from "ng2-search-filter";

import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    TranslateModule,
    GradingHomescreen2PageRoutingModule
  ],
  declarations: [GradingHomescreen2Page]
})
export class GradingHomescreen2PageModule {}
