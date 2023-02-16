import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LogsheetPressstationEditPage } from './logsheet-pressstation-edit.page';

describe('LogsheetPressstationEditPage', () => {
  let component: LogsheetPressstationEditPage;
  let fixture: ComponentFixture<LogsheetPressstationEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogsheetPressstationEditPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LogsheetPressstationEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
