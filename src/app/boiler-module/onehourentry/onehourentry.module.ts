import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { OnehourentryPageRoutingModule } from "./onehourentry-routing.module";

import { OnehourentryPage } from "./onehourentry.page";

import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TranslateModule,
    OnehourentryPageRoutingModule,
  ],
  declarations: [OnehourentryPage],
})
export class OnehourentryPageModule {}
