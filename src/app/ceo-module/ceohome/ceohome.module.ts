import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CeohomePageRoutingModule } from './ceohome-routing.module';

import { CeohomePage } from './ceohome.page';

import { Ng2SearchPipeModule } from "ng2-search-filter";

import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,    
    Ng2SearchPipeModule,
    TranslateModule,
    CeohomePageRoutingModule
  ],
  declarations: [CeohomePage]
})
export class CeohomePageModule {}
