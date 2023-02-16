import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { ProductionHourlysterilizerstationPageRoutingModule } from "./production-hourlysterilizerstation-routing.module";

import { ProductionHourlysterilizerstationPage } from "./production-hourlysterilizerstation.page";

import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TranslateModule,
    ProductionHourlysterilizerstationPageRoutingModule,
  ],
  declarations: [ProductionHourlysterilizerstationPage],
})
export class ProductionHourlysterilizerstationPageModule {}
