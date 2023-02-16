import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductionDashboardPageRoutingModule } from './production-dashboard-routing.module';

import { ProductionDashboardPage } from './production-dashboard.page';

import { TranslateModule } from "@ngx-translate/core";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TranslateModule,
    ProductionDashboardPageRoutingModule
  ],
  declarations: [ProductionDashboardPage]
})
export class ProductionDashboardPageModule {}
