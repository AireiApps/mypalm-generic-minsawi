import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OtherDispatchReportPage } from './other-dispatch-report.page';

describe('OtherDispatchReportPage', () => {
  let component: OtherDispatchReportPage;
  let fixture: ComponentFixture<OtherDispatchReportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherDispatchReportPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OtherDispatchReportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
