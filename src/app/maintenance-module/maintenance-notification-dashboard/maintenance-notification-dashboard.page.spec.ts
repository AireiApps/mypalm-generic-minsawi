import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MaintenanceNotificationDashboardPage } from './maintenance-notification-dashboard.page';

describe('MaintenanceNotificationDashboardPage', () => {
  let component: MaintenanceNotificationDashboardPage;
  let fixture: ComponentFixture<MaintenanceNotificationDashboardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintenanceNotificationDashboardPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MaintenanceNotificationDashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
