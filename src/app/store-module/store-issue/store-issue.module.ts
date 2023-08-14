import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StoreIssuePageRoutingModule } from './store-issue-routing.module';

import { StoreIssuePage } from './store-issue.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    StoreIssuePageRoutingModule
  ],
  declarations: [StoreIssuePage]
})
export class StoreIssuePageModule {}
