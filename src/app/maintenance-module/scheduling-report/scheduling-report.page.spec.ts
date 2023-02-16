import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SchedulingReportPage } from './scheduling-report.page';

describe('SchedulingReportPage', () => {
  let component: SchedulingReportPage;
  let fixture: ComponentFixture<SchedulingReportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchedulingReportPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SchedulingReportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
