import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BoilelogbookPageRoutingModule } from './boilelogbook-routing.module';

import { BoilelogbookPage } from './boilelogbook.page';

import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    IonicModule,
    BoilelogbookPageRoutingModule
  ],
  declarations: [BoilelogbookPage]
})
export class BoilelogbookPageModule {}
