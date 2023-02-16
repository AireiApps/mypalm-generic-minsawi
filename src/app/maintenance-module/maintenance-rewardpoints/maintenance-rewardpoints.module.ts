import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MaintenanceRewardpointsPageRoutingModule } from './maintenance-rewardpoints-routing.module';

import { MaintenanceRewardpointsPage } from './maintenance-rewardpoints.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaintenanceRewardpointsPageRoutingModule
  ],
  declarations: [MaintenanceRewardpointsPage]
})
export class MaintenanceRewardpointsPageModule {}
