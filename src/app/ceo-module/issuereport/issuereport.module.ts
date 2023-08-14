import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IssuereportPageRoutingModule } from './issuereport-routing.module';

import { IssuereportPage } from './issuereport.page';

import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    IssuereportPageRoutingModule
  ],
  declarations: [IssuereportPage]
})
export class IssuereportPageModule {}
