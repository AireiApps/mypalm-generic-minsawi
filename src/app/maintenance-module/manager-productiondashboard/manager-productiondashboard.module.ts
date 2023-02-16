import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { ManagerProductiondashboardPageRoutingModule } from "./manager-productiondashboard-routing.module";

import { ManagerProductiondashboardPage } from "./manager-productiondashboard.page";

import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TranslateModule,
    ManagerProductiondashboardPageRoutingModule,
  ],
  declarations: [ManagerProductiondashboardPage],
})
export class ManagerProductiondashboardPageModule {}
