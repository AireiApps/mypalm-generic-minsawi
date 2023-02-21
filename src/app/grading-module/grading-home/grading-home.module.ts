import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { GradingHomePageRoutingModule } from "./grading-home-routing.module";

import { GradingHomePage } from "./grading-home.page";

import { Ng2SearchPipeModule } from "ng2-search-filter";

import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    TranslateModule,
    IonicModule,
    GradingHomePageRoutingModule,
  ],
  declarations: [GradingHomePage],
})
export class GradingHomePageModule {}
