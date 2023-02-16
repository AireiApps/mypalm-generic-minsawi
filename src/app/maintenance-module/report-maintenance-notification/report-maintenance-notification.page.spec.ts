import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReportMaintenanceNotificationPage } from './report-maintenance-notification.page';

describe('ReportMaintenanceNotificationPage', () => {
  let component: ReportMaintenanceNotificationPage;
  let fixture: ComponentFixture<ReportMaintenanceNotificationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportMaintenanceNotificationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReportMaintenanceNotificationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
