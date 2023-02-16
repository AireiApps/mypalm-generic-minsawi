import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportMaintenanceNotificationPageRoutingModule } from './report-maintenance-notification-routing.module';

import { ReportMaintenanceNotificationPage } from './report-maintenance-notification.page';

import { OvalShapeModule } from 'src/app/component/ux/oval-shape/oval-shape.module';

import { TranslateModule } from "@ngx-translate/core";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    OvalShapeModule,
    IonicModule,
    TranslateModule,
    ReportMaintenanceNotificationPageRoutingModule
  ],
  declarations: [ReportMaintenanceNotificationPage]
})
export class ReportMaintenanceNotificationPageModule {}
