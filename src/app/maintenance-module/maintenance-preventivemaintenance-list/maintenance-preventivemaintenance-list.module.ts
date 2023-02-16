import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { MaintenancePreventivemaintenanceListPageRoutingModule } from "./maintenance-preventivemaintenance-list-routing.module";

import { MaintenancePreventivemaintenanceListPage } from "./maintenance-preventivemaintenance-list.page";

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
    MaintenancePreventivemaintenanceListPageRoutingModule,
  ],
  declarations: [MaintenancePreventivemaintenanceListPage],
})
export class MaintenancePreventivemaintenanceListPageModule {}
