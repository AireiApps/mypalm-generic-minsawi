import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StoreStatusupdatePageRoutingModule } from './store-statusupdate-routing.module';

import { StoreStatusupdatePage } from './store-statusupdate.page';

import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    StoreStatusupdatePageRoutingModule
  ],
  declarations: [StoreStatusupdatePage]
})
export class StoreStatusupdatePageModule {}
