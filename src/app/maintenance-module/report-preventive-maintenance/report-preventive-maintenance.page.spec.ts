import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReportPreventiveMaintenancePage } from './report-preventive-maintenance.page';

describe('ReportPreventiveMaintenancePage', () => {
  let component: ReportPreventiveMaintenancePage;
  let fixture: ComponentFixture<ReportPreventiveMaintenancePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportPreventiveMaintenancePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReportPreventiveMaintenancePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
