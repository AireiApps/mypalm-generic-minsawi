import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { ReportPvrpvPageRoutingModule } from "./report-pvrpv-routing.module";

import { ReportPvrpvPage } from "./report-pvrpv.page";

import { OvalShapeModule } from "src/app/component/ux/oval-shape/oval-shape.module";

import { TranslateModule } from "@ngx-translate/core";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    OvalShapeModule,
    IonicModule,
    TranslateModule,
    ReportPvrpvPageRoutingModule,
  ],
  declarations: [ReportPvrpvPage],
})
export class ReportPvrpvPageModule {}
