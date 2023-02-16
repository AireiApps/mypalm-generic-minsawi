import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MaintenanceProductionReportPage } from './maintenance-production-report.page';

describe('MaintenanceProductionReportPage', () => {
  let component: MaintenanceProductionReportPage;
  let fixture: ComponentFixture<MaintenanceProductionReportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintenanceProductionReportPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MaintenanceProductionReportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
