import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AbcdreportPageRoutingModule } from './abcdreport-routing.module';

import { AbcdreportPage } from './abcdreport.page';

import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    AbcdreportPageRoutingModule
  ],
  declarations: [AbcdreportPage]
})
export class AbcdreportPageModule {}
