import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SorengineerapprovalPageRoutingModule } from './sorengineerapproval-routing.module';

import { SorengineerapprovalPage } from './sorengineerapproval.page';

import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    SorengineerapprovalPageRoutingModule
  ],
  declarations: [SorengineerapprovalPage]
})
export class SorengineerapprovalPageModule {}
