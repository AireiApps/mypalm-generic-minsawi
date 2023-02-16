import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MaintenanceNotificationAcceptModalPage } from './maintenance-notification-accept-modal.page';

describe('MaintenanceNotificationAcceptModalPage', () => {
  let component: MaintenanceNotificationAcceptModalPage;
  let fixture: ComponentFixture<MaintenanceNotificationAcceptModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintenanceNotificationAcceptModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MaintenanceNotificationAcceptModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
