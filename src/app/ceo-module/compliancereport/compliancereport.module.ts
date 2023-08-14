import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompliancereportPageRoutingModule } from './compliancereport-routing.module';

import { CompliancereportPage } from './compliancereport.page';

import { SharedModule } from 'src/app/shared/shared.module';

import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SharedModule,
    TranslateModule,
    CompliancereportPageRoutingModule
  ],
  declarations: [CompliancereportPage]
})
export class CompliancereportPageModule {}
