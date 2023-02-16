import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { MaintenanceAcknowledgeModalPageRoutingModule } from "./maintenance-acknowledge-modal-routing.module";

import { MaintenanceAcknowledgeModalPage } from "./maintenance-acknowledge-modal.page";

import { TranslateModule } from "@ngx-translate/core";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TranslateModule,
    MaintenanceAcknowledgeModalPageRoutingModule,
  ],
  declarations: [MaintenanceAcknowledgeModalPage],
})
export class MaintenanceAcknowledgeModalPageModule {}
