import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { MaintenanceReplacementModalPageRoutingModule } from "./maintenance-replacement-modal-routing.module";

import { MaintenanceReplacementModalPage } from "./maintenance-replacement-modal.page";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TranslateModule,
    MaintenanceReplacementModalPageRoutingModule,
  ],
  declarations: [MaintenanceReplacementModalPage],
})
export class MaintenanceReplacementModalPageModule {}
