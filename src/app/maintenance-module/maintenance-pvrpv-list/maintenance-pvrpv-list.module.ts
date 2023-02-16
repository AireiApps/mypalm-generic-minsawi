import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { MaintenancePvrpvListPageRoutingModule } from "./maintenance-pvrpv-list-routing.module";

import { MaintenancePvrpvListPage } from "./maintenance-pvrpv-list.page";

import { OvalShapeModule } from "src/app/component/ux/oval-shape/oval-shape.module";

import { Ng2SearchPipeModule } from "ng2-search-filter";

import { TranslateModule } from "@ngx-translate/core";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    OvalShapeModule,
    Ng2SearchPipeModule,
    TranslateModule,
    MaintenancePvrpvListPageRoutingModule,
  ],
  declarations: [MaintenancePvrpvListPage],
})
export class MaintenancePvrpvListPageModule {}
