import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { ProductionHourlysterilizerstationAlertPageRoutingModule } from "./production-hourlysterilizerstation-alert-routing.module";

import { ProductionHourlysterilizerstationAlertPage } from "./production-hourlysterilizerstation-alert.page";

import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ProductionHourlysterilizerstationAlertPageRoutingModule,
  ],
  declarations: [ProductionHourlysterilizerstationAlertPage],
})
export class ProductionHourlysterilizerstationAlertPageModule {}
