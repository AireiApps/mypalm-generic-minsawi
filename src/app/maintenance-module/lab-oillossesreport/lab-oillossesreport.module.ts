import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LabOillossesreportPageRoutingModule } from './lab-oillossesreport-routing.module';

import { LabOillossesreportPage } from './lab-oillossesreport.page';

import { TranslateModule } from "@ngx-translate/core";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TranslateModule,
    LabOillossesreportPageRoutingModule
  ],
  declarations: [LabOillossesreportPage]
})
export class LabOillossesreportPageModule {}
