import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { OvalShapeComponent } from "./oval-shape.component";
import { IonicModule } from "@ionic/angular";

@NgModule({
  declarations: [OvalShapeComponent],
  imports: [CommonModule, IonicModule],
  exports: [OvalShapeComponent],
  entryComponents: [OvalShapeComponent],
})
export class OvalShapeModule {}
