import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { RampHomePageRoutingModule } from "./ramp-home-routing.module";
import { RampHomePage } from "./ramp-home.page";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    IonicModule,
    RampHomePageRoutingModule,
  ],
  declarations: [RampHomePage],
})
export class RampHomePageModule {}
