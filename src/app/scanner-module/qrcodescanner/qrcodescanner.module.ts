import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QrcodescannerPageRoutingModule } from './qrcodescanner-routing.module';

import { QrcodescannerPage } from './qrcodescanner.page';


import { OvalShapeModule } from "src/app/component/ux/oval-shape/oval-shape.module";

import { Ng2SearchPipeModule } from "ng2-search-filter";

import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    OvalShapeModule,
    Ng2SearchPipeModule,
    TranslateModule,
    QrcodescannerPageRoutingModule
  ],
  declarations: [QrcodescannerPage]
})
export class QrcodescannerPageModule {}
