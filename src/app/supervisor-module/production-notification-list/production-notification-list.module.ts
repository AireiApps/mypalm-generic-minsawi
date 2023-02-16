import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductionNotificationListPageRoutingModule } from './production-notification-list-routing.module';

import { ProductionNotificationListPage } from './production-notification-list.page';

import { OvalShapeModule } from 'src/app/component/ux/oval-shape/oval-shape.module';

import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    OvalShapeModule,
    Ng2SearchPipeModule,
    TranslateModule,
    IonicModule,
    ProductionNotificationListPageRoutingModule
  ],
  declarations: [ProductionNotificationListPage]
})
export class ProductionNotificationListPageModule {}
