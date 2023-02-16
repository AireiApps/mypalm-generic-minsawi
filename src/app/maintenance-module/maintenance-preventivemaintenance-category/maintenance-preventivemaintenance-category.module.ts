import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MaintenancePreventivemaintenanceCategoryPageRoutingModule } from './maintenance-preventivemaintenance-category-routing.module';

import { MaintenancePreventivemaintenanceCategoryPage } from './maintenance-preventivemaintenance-category.page';
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    MaintenancePreventivemaintenanceCategoryPageRoutingModule
  ],
  declarations: [MaintenancePreventivemaintenanceCategoryPage]
})
export class MaintenancePreventivemaintenanceCategoryPageModule {}
