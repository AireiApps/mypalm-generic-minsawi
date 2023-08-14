import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EngineerorderreqAddPageRoutingModule } from './engineerorderreq-add-routing.module';

import { EngineerorderreqAddPage } from './engineerorderreq-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    EngineerorderreqAddPageRoutingModule
  ],
  declarations: [EngineerorderreqAddPage]
})
export class EngineerorderreqAddPageModule {}
