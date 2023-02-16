import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MaintenanceNotificationReportsPageRoutingModule } from './maintenance-notification-reports-routing.module';

import { MaintenanceNotificationReportsPage } from './maintenance-notification-reports.page';

import { TranslateModule } from "@ngx-translate/core";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    MaintenanceNotificationReportsPageRoutingModule
  ],
  declarations: [MaintenanceNotificationReportsPage]
})
export class MaintenanceNotificationReportsPageModule {}
