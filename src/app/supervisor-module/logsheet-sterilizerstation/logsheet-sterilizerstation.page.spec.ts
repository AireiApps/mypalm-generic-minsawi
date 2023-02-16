import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LogsheetSterilizerstationPage } from './logsheet-sterilizerstation.page';

describe('LogsheetSterilizerstationPage', () => {
  let component: LogsheetSterilizerstationPage;
  let fixture: ComponentFixture<LogsheetSterilizerstationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogsheetSterilizerstationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LogsheetSterilizerstationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
