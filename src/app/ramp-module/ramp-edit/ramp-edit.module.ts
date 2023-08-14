import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { RampEditPageRoutingModule } from "./ramp-edit-routing.module";

import { RampEditPage } from "./ramp-edit.page";

import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TranslateModule,
    RampEditPageRoutingModule,
  ],
  declarations: [RampEditPage],
})
export class RampEditPageModule {}
