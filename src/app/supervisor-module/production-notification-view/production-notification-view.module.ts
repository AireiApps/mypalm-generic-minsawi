import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductionNotificationViewPageRoutingModule } from './production-notification-view-routing.module';

import { ProductionNotificationViewPage } from './production-notification-view.page';

import { TranslateModule } from "@ngx-translate/core";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ProductionNotificationViewPageRoutingModule
  ],
  declarations: [ProductionNotificationViewPage]
})
export class ProductionNotificationViewPageModule {}
