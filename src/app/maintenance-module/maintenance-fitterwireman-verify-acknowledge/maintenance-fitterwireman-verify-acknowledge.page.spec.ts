import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MaintenanceFitterwiremanVerifyAcknowledgePage } from './maintenance-fitterwireman-verify-acknowledge.page';

describe('MaintenanceFitterwiremanVerifyAcknowledgePage', () => {
  let component: MaintenanceFitterwiremanVerifyAcknowledgePage;
  let fixture: ComponentFixture<MaintenanceFitterwiremanVerifyAcknowledgePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintenanceFitterwiremanVerifyAcknowledgePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MaintenanceFitterwiremanVerifyAcknowledgePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
