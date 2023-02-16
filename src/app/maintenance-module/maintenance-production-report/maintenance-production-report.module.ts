import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MaintenanceProductionReportPageRoutingModule } from './maintenance-production-report-routing.module';

import { MaintenanceProductionReportPage } from './maintenance-production-report.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaintenanceProductionReportPageRoutingModule
  ],
  declarations: [MaintenanceProductionReportPage]
})
export class MaintenanceProductionReportPageModule {}
