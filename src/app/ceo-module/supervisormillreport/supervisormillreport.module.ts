import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SupervisormillreportPageRoutingModule } from './supervisormillreport-routing.module';

import { SupervisormillreportPage } from './supervisormillreport.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    SupervisormillreportPageRoutingModule
  ],
  declarations: [SupervisormillreportPage]
})
export class SupervisormillreportPageModule {}
