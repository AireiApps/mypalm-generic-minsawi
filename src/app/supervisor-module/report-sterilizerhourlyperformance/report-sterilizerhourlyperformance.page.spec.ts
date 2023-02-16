import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReportSterilizerhourlyperformancePage } from './report-sterilizerhourlyperformance.page';

describe('ReportSterilizerhourlyperformancePage', () => {
  let component: ReportSterilizerhourlyperformancePage;
  let fixture: ComponentFixture<ReportSterilizerhourlyperformancePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportSterilizerhourlyperformancePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReportSterilizerhourlyperformancePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
