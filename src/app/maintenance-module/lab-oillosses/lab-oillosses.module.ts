import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LabOillossesPageRoutingModule } from './lab-oillosses-routing.module';

import { LabOillossesPage } from './lab-oillosses.page';

import { TranslateModule } from "@ngx-translate/core";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TranslateModule,
    LabOillossesPageRoutingModule
  ],
  declarations: [LabOillossesPage]
})
export class LabOillossesPageModule {}
