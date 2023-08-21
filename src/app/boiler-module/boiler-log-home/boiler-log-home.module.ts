import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { BoilerLogHomePageRoutingModule } from "./boiler-log-home-routing.module";

import { BoilerLogHomePage } from "./boiler-log-home.page";

import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TranslateModule,
    BoilerLogHomePageRoutingModule,
  ],
  declarations: [BoilerLogHomePage],
})
export class BoilerLogHomePageModule {}
