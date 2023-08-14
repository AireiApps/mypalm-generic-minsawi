import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { ManagertabSorscreenPageRoutingModule } from "./managertab-sorscreen-routing.module";

import { ManagertabSorscreenPage } from "./managertab-sorscreen.page";

import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ManagertabSorscreenPageRoutingModule,
  ],
  declarations: [ManagertabSorscreenPage],
})
export class ManagertabSorscreenPageModule {}
