import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { RampReportsPageRoutingModule } from "./ramp-reports-routing.module";

import { RampReportsPage } from "./ramp-reports.page";

import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TranslateModule,
    RampReportsPageRoutingModule,
  ],
  declarations: [RampReportsPage],
})
export class RampReportsPageModule {}
