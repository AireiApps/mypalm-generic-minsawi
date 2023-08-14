import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CeomaintenancereportPageRoutingModule } from './ceomaintenancereport-routing.module';

import { CeomaintenancereportPage } from './ceomaintenancereport.page';

import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    CeomaintenancereportPageRoutingModule
  ],
  declarations: [CeomaintenancereportPage]
})
export class CeomaintenancereportPageModule {}
