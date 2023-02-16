import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MaintenanceForemanVerificationPage } from './maintenance-foreman-verification.page';

describe('MaintenanceForemanVerificationPage', () => {
  let component: MaintenanceForemanVerificationPage;
  let fixture: ComponentFixture<MaintenanceForemanVerificationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintenanceForemanVerificationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MaintenanceForemanVerificationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
