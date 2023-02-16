import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MaintenanceNotificationModalPage } from './maintenance-notification-modal.page';

describe('MaintenanceNotificationModalPage', () => {
  let component: MaintenanceNotificationModalPage;
  let fixture: ComponentFixture<MaintenanceNotificationModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintenanceNotificationModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MaintenanceNotificationModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
