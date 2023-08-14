import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CeosupervisorproductioncommentsPageRoutingModule } from './ceosupervisorproductioncomments-routing.module';

import { CeosupervisorproductioncommentsPage } from './ceosupervisorproductioncomments.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    CeosupervisorproductioncommentsPageRoutingModule
  ],
  declarations: [CeosupervisorproductioncommentsPage]
})
export class CeosupervisorproductioncommentsPageModule {}
