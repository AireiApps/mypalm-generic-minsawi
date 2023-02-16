import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { DateModalPageRoutingModule } from "./date-modal-routing.module";

import { DateModalPage } from "./date-modal.page";

import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TranslateModule,
    DateModalPageRoutingModule,
  ],
  declarations: [DateModalPage],
})
export class DateModalPageModule {}
