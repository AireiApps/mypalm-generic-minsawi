import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GradingReportPage } from './grading-report.page';

describe('GradingReportPage', () => {
  let component: GradingReportPage;
  let fixture: ComponentFixture<GradingReportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GradingReportPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GradingReportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
