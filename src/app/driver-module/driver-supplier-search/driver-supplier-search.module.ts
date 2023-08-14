import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { DriverSupplierSearchPageRoutingModule } from "./driver-supplier-search-routing.module";

import { DriverSupplierSearchPage } from "./driver-supplier-search.page";

import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TranslateModule,
    DriverSupplierSearchPageRoutingModule,
  ],
  declarations: [DriverSupplierSearchPage],
})
export class DriverSupplierSearchPageModule {}
