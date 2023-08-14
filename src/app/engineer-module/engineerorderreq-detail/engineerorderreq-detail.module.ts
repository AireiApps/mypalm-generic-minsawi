import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EngineerorderreqDetailPageRoutingModule } from './engineerorderreq-detail-routing.module';

import { EngineerorderreqDetailPage } from './engineerorderreq-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EngineerorderreqDetailPageRoutingModule
  ],
  declarations: [EngineerorderreqDetailPage]
})
export class EngineerorderreqDetailPageModule {}
