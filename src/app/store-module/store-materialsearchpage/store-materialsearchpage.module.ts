import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StoreMaterialsearchpagePageRoutingModule } from './store-materialsearchpage-routing.module';

import { StoreMaterialsearchpagePage } from './store-materialsearchpage.page';

import { PipesModule } from 'src/app/pipes/pipes.module';

import { TranslateModule } from "@ngx-translate/core";

import { OvalShapeModule } from "src/app/component/ux/oval-shape/oval-shape.module";

import { Ng2SearchPipeModule } from "ng2-search-filter";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    TranslateModule,
    ReactiveFormsModule,
    StoreMaterialsearchpagePageRoutingModule
  ],
  declarations: [StoreMaterialsearchpagePage]
})
export class StoreMaterialsearchpagePageModule {}
