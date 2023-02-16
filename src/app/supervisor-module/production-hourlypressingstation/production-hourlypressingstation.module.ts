import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { ProductionHourlypressingstationPageRoutingModule } from "./production-hourlypressingstation-routing.module";

import { ProductionHourlypressingstationPage } from "./production-hourlypressingstation.page";

import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TranslateModule,
    ProductionHourlypressingstationPageRoutingModule,
  ],
  declarations: [ProductionHourlypressingstationPage],
})
export class ProductionHourlypressingstationPageModule {}
