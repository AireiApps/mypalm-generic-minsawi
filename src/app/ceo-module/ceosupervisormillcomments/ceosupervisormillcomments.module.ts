import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CeosupervisormillcommentsPageRoutingModule } from './ceosupervisormillcomments-routing.module';

import { CeosupervisormillcommentsPage } from './ceosupervisormillcomments.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    CeosupervisormillcommentsPageRoutingModule
  ],
  declarations: [CeosupervisormillcommentsPage]
})
export class CeosupervisormillcommentsPageModule {}
