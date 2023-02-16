import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReportProductionMaintenanceNotificationPage } from './report-production-maintenance-notification.page';

describe('ReportProductionMaintenanceNotificationPage', () => {
  let component: ReportProductionMaintenanceNotificationPage;
  let fixture: ComponentFixture<ReportProductionMaintenanceNotificationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportProductionMaintenanceNotificationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReportProductionMaintenanceNotificationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
