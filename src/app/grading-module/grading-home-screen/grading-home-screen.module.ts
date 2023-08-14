import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GradingHomeScreenPageRoutingModule } from './grading-home-screen-routing.module';

import { GradingHomeScreenPage } from './grading-home-screen.page';

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
    GradingHomeScreenPageRoutingModule
  ],
  declarations: [GradingHomeScreenPage]
})
export class GradingHomeScreenPageModule {}
