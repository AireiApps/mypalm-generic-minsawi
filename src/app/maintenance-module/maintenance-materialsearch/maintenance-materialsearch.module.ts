import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MaintenanceMaterialsearchPageRoutingModule } from './maintenance-materialsearch-routing.module';

import { MaintenanceMaterialsearchPage } from './maintenance-materialsearch.page';

import { PipesModule } from 'src/app/pipes/pipes.module';

import { TranslateModule } from "@ngx-translate/core";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule,
    IonicModule,
    TranslateModule,
    MaintenanceMaterialsearchPageRoutingModule
  ],
  declarations: [MaintenanceMaterialsearchPage]
})
export class MaintenanceMaterialsearchPageModule {}
