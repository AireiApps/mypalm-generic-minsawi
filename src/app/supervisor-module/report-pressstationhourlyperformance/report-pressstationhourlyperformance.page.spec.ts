import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReportPressstationhourlyperformancePage } from './report-pressstationhourlyperformance.page';

describe('ReportPressstationhourlyperformancePage', () => {
  let component: ReportPressstationhourlyperformancePage;
  let fixture: ComponentFixture<ReportPressstationhourlyperformancePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportPressstationhourlyperformancePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReportPressstationhourlyperformancePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
