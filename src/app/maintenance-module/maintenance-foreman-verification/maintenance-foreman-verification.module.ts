import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { MaintenanceForemanVerificationPageRoutingModule } from "./maintenance-foreman-verification-routing.module";

import { MaintenanceForemanVerificationPage } from "./maintenance-foreman-verification.page";

import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TranslateModule,
    MaintenanceForemanVerificationPageRoutingModule,
  ],
  declarations: [MaintenanceForemanVerificationPage],
})
export class MaintenanceForemanVerificationPageModule {}
