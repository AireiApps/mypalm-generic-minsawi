import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReportCorrectiveMaintenancePage } from './report-corrective-maintenance.page';

describe('ReportCorrectiveMaintenancePage', () => {
  let component: ReportCorrectiveMaintenancePage;
  let fixture: ComponentFixture<ReportCorrectiveMaintenancePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportCorrectiveMaintenancePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReportCorrectiveMaintenancePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
