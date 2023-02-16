import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SegregatenotificationmillstatusPageRoutingModule } from './segregatenotificationmillstatus-routing.module';

import { SegregatenotificationmillstatusPage } from './segregatenotificationmillstatus.page';
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    SegregatenotificationmillstatusPageRoutingModule
  ],
  declarations: [SegregatenotificationmillstatusPage]
})
export class SegregatenotificationmillstatusPageModule {}
