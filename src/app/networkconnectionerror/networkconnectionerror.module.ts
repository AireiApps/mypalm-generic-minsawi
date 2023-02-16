import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { NetworkconnectionerrorPageRoutingModule } from "./networkconnectionerror-routing.module";

import { NetworkconnectionerrorPage } from "./networkconnectionerror.page";

import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    NetworkconnectionerrorPageRoutingModule,
  ],
  declarations: [NetworkconnectionerrorPage],
})
export class NetworkconnectionerrorPageModule {}
