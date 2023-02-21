import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { MaintenanceFitterwiremanVerifyAcknowledgePageRoutingModule } from "./maintenance-fitterwireman-verify-acknowledge-routing.module";

import { MaintenanceFitterwiremanVerifyAcknowledgePage } from "./maintenance-fitterwireman-verify-acknowledge.page";

import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TranslateModule,
    MaintenanceFitterwiremanVerifyAcknowledgePageRoutingModule,
  ],
  declarations: [MaintenanceFitterwiremanVerifyAcknowledgePage],
})
export class MaintenanceFitterwiremanVerifyAcknowledgePageModule {}
