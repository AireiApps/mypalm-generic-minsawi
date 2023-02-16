import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";

import { OvalShapeComponent } from "./oval-shape.component";

describe("OvalShapeComponent", () => {
  let component: OvalShapeComponent;
  let fixture: ComponentFixture<OvalShapeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OvalShapeComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(OvalShapeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
