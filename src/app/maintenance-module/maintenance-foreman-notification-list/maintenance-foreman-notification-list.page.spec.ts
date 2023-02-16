import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MaintenanceForemanNotificationListPage } from './maintenance-foreman-notification-list.page';

describe('MaintenanceForemanNotificationListPage', () => {
  let component: MaintenanceForemanNotificationListPage;
  let fixture: ComponentFixture<MaintenanceForemanNotificationListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintenanceForemanNotificationListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MaintenanceForemanNotificationListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
