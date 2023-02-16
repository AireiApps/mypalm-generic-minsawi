import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MaintenanceEngineerNotificationModalPage } from './maintenance-engineer-notification-modal.page';

describe('MaintenanceEngineerNotificationModalPage', () => {
  let component: MaintenanceEngineerNotificationModalPage;
  let fixture: ComponentFixture<MaintenanceEngineerNotificationModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintenanceEngineerNotificationModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MaintenanceEngineerNotificationModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
