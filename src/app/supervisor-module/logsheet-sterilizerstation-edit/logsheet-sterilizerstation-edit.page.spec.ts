import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LogsheetSterilizerstationEditPage } from './logsheet-sterilizerstation-edit.page';

describe('LogsheetSterilizerstationEditPage', () => {
  let component: LogsheetSterilizerstationEditPage;
  let fixture: ComponentFixture<LogsheetSterilizerstationEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogsheetSterilizerstationEditPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LogsheetSterilizerstationEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
