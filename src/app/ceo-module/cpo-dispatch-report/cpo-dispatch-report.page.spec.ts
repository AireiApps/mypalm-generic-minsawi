import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CpoDispatchReportPage } from './cpo-dispatch-report.page';

describe('CpoDispatchReportPage', () => {
  let component: CpoDispatchReportPage;
  let fixture: ComponentFixture<CpoDispatchReportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CpoDispatchReportPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CpoDispatchReportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
