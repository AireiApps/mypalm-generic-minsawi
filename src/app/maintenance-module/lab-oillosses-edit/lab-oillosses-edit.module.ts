import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LabOillossesEditPageRoutingModule } from './lab-oillosses-edit-routing.module';

import { LabOillossesEditPage } from './lab-oillosses-edit.page';
import { TranslateModule } from "@ngx-translate/core";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TranslateModule,
    LabOillossesEditPageRoutingModule
  ],
  declarations: [LabOillossesEditPage]
})
export class LabOillossesEditPageModule {}
