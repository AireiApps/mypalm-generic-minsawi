import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MaintenanceNotificationMaterialrequestPage } from './maintenance-notification-materialrequest.page';

describe('MaintenanceNotificationMaterialrequestPage', () => {
  let component: MaintenanceNotificationMaterialrequestPage;
  let fixture: ComponentFixture<MaintenanceNotificationMaterialrequestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintenanceNotificationMaterialrequestPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MaintenanceNotificationMaterialrequestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
