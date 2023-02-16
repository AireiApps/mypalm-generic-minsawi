import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MaintenanceNotificationUpdateModalPage } from './maintenance-notification-update-modal.page';

describe('MaintenanceNotificationUpdateModalPage', () => {
  let component: MaintenanceNotificationUpdateModalPage;
  let fixture: ComponentFixture<MaintenanceNotificationUpdateModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintenanceNotificationUpdateModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MaintenanceNotificationUpdateModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
