import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MaintenanceNotificationDashboardPageRoutingModule } from './maintenance-notification-dashboard-routing.module';

import { MaintenanceNotificationDashboardPage } from './maintenance-notification-dashboard.page';

import { TranslateModule } from "@ngx-translate/core";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    MaintenanceNotificationDashboardPageRoutingModule
  ],
  declarations: [MaintenanceNotificationDashboardPage]
})
export class MaintenanceNotificationDashboardPageModule {}
