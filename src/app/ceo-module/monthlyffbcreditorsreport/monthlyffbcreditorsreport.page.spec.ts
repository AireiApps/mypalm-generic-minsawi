import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MonthlyffbcreditorsreportPage } from './monthlyffbcreditorsreport.page';

describe('MonthlyffbcreditorsreportPage', () => {
  let component: MonthlyffbcreditorsreportPage;
  let fixture: ComponentFixture<MonthlyffbcreditorsreportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthlyffbcreditorsreportPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MonthlyffbcreditorsreportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
