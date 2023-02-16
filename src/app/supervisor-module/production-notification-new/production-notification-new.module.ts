import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { ProductionNotificationNewPageRoutingModule } from "./production-notification-new-routing.module";

import { ProductionNotificationNewPage } from "./production-notification-new.page";

import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TranslateModule,
    ProductionNotificationNewPageRoutingModule,
  ],
  declarations: [ProductionNotificationNewPage],
})
export class ProductionNotificationNewPageModule {}
