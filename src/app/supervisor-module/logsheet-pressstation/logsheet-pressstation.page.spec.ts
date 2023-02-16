import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LogsheetPressstationPage } from './logsheet-pressstation.page';

describe('LogsheetPressstationPage', () => {
  let component: LogsheetPressstationPage;
  let fixture: ComponentFixture<LogsheetPressstationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogsheetPressstationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LogsheetPressstationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
