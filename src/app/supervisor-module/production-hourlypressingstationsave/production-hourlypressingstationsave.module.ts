import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { ProductionHourlypressingstationsavePageRoutingModule } from "./production-hourlypressingstationsave-routing.module";

import { ProductionHourlypressingstationsavePage } from "./production-hourlypressingstationsave.page";

import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TranslateModule,
    ProductionHourlypressingstationsavePageRoutingModule,
  ],
  declarations: [ProductionHourlypressingstationsavePage],
})
export class ProductionHourlypressingstationsavePageModule {}
