import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SupervisorproductionreportPageRoutingModule } from './supervisorproductionreport-routing.module';

import { SupervisorproductionreportPage } from './supervisorproductionreport.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    SupervisorproductionreportPageRoutingModule
  ],
  declarations: [SupervisorproductionreportPage]
})
export class SupervisorproductionreportPageModule {}
