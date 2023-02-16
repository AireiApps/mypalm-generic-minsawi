import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { IonicModule } from '@ionic/angular';

import { LabOillossesListPageRoutingModule } from './lab-oillosses-list-routing.module';

import { LabOillossesListPage } from './lab-oillosses-list.page';
import { TranslateModule } from "@ngx-translate/core";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    Ng2SearchPipeModule,
    TranslateModule,
    LabOillossesListPageRoutingModule
  ],
  declarations: [LabOillossesListPage]
})
export class LabOillossesListPageModule {}
