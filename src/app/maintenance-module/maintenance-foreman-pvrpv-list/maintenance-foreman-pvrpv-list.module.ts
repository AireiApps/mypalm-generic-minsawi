import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { MaintenanceForemanPvrpvListPageRoutingModule } from "./maintenance-foreman-pvrpv-list-routing.module";

import { MaintenanceForemanPvrpvListPage } from "./maintenance-foreman-pvrpv-list.page";

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
    MaintenanceForemanPvrpvListPageRoutingModule,
  ],
  declarations: [MaintenanceForemanPvrpvListPage],
})
export class MaintenanceForemanPvrpvListPageModule {}
