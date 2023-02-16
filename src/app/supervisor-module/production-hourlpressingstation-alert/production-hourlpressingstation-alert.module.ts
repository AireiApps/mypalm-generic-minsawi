import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { ProductionHourlpressingstationAlertPageRoutingModule } from "./production-hourlpressingstation-alert-routing.module";

import { ProductionHourlpressingstationAlertPage } from "./production-hourlpressingstation-alert.page";

import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ProductionHourlpressingstationAlertPageRoutingModule,
  ],
  declarations: [ProductionHourlpressingstationAlertPage],
})
export class ProductionHourlpressingstationAlertPageModule {}
