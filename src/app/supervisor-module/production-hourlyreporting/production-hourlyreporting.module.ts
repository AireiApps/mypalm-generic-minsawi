import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { ProductionHourlyreportingPageRoutingModule } from "./production-hourlyreporting-routing.module";

import { ProductionHourlyreportingPage } from "./production-hourlyreporting.page";

import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ProductionHourlyreportingPageRoutingModule,
  ],
  declarations: [ProductionHourlyreportingPage],
})
export class ProductionHourlyreportingPageModule {}
