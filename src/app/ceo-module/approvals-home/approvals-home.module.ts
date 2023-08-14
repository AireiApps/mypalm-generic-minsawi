import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApprovalsHomePageRoutingModule } from './approvals-home-routing.module';

import { ApprovalsHomePage } from './approvals-home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApprovalsHomePageRoutingModule
  ],
  declarations: [ApprovalsHomePage]
})
export class ApprovalsHomePageModule {}
