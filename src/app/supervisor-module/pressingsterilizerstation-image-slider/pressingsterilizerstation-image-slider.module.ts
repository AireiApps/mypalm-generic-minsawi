import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PressingsterilizerstationImageSliderPageRoutingModule } from './pressingsterilizerstation-image-slider-routing.module';

import { PressingsterilizerstationImageSliderPage } from './pressingsterilizerstation-image-slider.page';

import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    PressingsterilizerstationImageSliderPageRoutingModule
  ],
  declarations: [PressingsterilizerstationImageSliderPage]
})
export class PressingsterilizerstationImageSliderPageModule {}
