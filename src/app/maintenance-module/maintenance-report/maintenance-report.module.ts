import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MaintenanceReportPageRoutingModule } from './maintenance-report-routing.module';

import { MaintenanceReportPage } from './maintenance-report.page';

import { SharedModule } from 'src/app/shared/shared.module';

import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    MaintenanceReportPageRoutingModule,
    TranslateModule
  ],
  declarations: [MaintenanceReportPage]
})
export class MaintenanceReportPageModule {}
