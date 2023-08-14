import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistoryPageRoutingModule } from './history-routing.module';
import { HistoryPage } from './history.page';
import { OvalShapeModule } from '../component/ux/oval-shape/oval-shape.module';
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistoryPageRoutingModule,
    ReactiveFormsModule,
    OvalShapeModule,
    TranslateModule
  ],
  declarations: [HistoryPage]
})
export class HistoryPageModule { }
