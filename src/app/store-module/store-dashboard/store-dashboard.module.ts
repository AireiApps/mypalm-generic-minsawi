import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { StoreDashboardPageRoutingModule } from './store-dashboard-routing.module';

import { StoreDashboardPage } from './store-dashboard.page';

import { Ng2SearchPipeModule } from "ng2-search-filter";

import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    TranslateModule,
    StoreDashboardPageRoutingModule
  ],
  declarations: [StoreDashboardPage]
})
export class StoreDashboardPageModule {}
