import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { TabSorscreenPageRoutingModule } from "./tab-sorscreen-routing.module";

import { TabSorscreenPage } from "./tab-sorscreen.page";

import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    IonicModule,
    TabSorscreenPageRoutingModule,
  ],
  declarations: [TabSorscreenPage],
})
export class TabSorscreenPageModule {}
