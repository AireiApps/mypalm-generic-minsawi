import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { WorkorderreportPageRoutingModule } from "./workorderreport-routing.module";

import { WorkorderreportPage } from "./workorderreport.page";

import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    WorkorderreportPageRoutingModule,
  ],
  declarations: [WorkorderreportPage],
})
export class WorkorderreportPageModule {}
