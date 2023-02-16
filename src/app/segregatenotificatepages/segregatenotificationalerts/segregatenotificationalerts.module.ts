import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { SegregatenotificationalertsPageRoutingModule } from "./segregatenotificationalerts-routing.module";

import { SegregatenotificationalertsPage } from "./segregatenotificationalerts.page";

import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    SegregatenotificationalertsPageRoutingModule,
  ],
  declarations: [SegregatenotificationalertsPage],
})
export class SegregatenotificationalertsPageModule {}
