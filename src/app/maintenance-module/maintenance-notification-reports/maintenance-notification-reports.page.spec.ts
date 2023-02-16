import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MaintenanceNotificationReportsPage } from './maintenance-notification-reports.page';

describe('MaintenanceNotificationReportsPage', () => {
  let component: MaintenanceNotificationReportsPage;
  let fixture: ComponentFixture<MaintenanceNotificationReportsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintenanceNotificationReportsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MaintenanceNotificationReportsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
