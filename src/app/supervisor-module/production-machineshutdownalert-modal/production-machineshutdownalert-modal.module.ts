import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { ProductionMachineshutdownalertModalPageRoutingModule } from "./production-machineshutdownalert-modal-routing.module";

import { ProductionMachineshutdownalertModalPage } from "./production-machineshutdownalert-modal.page";

import { TranslateModule } from "@ngx-translate/core";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TranslateModule,
    ProductionMachineshutdownalertModalPageRoutingModule,
  ],
  declarations: [ProductionMachineshutdownalertModalPage],
})
export class ProductionMachineshutdownalertModalPageModule {}
